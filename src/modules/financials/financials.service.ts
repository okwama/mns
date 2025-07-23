import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class FinancialsService {
  constructor(private readonly dataSource: DataSource) {}

  async getMonthlyTrends(from?: string, to?: string) {
    // Sales by month
    let salesQuery = `
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COALESCE(SUM(total_amount), 0) as total_sales
      FROM sales_orders
      WHERE 1=1`;
    const salesParams: any[] = [];
    if (from && to) {
      salesQuery += ' AND created_at BETWEEN ? AND ?';
      salesParams.push(from, to);
    } else if (from) {
      salesQuery += ' AND created_at >= ?';
      salesParams.push(from);
    } else if (to) {
      salesQuery += ' AND created_at <= ?';
      salesParams.push(to);
    }
    salesQuery += ' GROUP BY month';
    const sales = await this.dataSource.query(salesQuery, salesParams);

    // Revenue and expenses by month
    let txQuery = `
      SELECT DATE_FORMAT(date, '%Y-%m') as month,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expenses
      FROM transactions
      WHERE 1=1`;
    const txParams: any[] = [];
    if (from && to) {
      txQuery += ' AND date BETWEEN ? AND ?';
      txParams.push(from, to);
    } else if (from) {
      txQuery += ' AND date >= ?';
      txParams.push(from);
    } else if (to) {
      txQuery += ' AND date <= ?';
      txParams.push(to);
    }
    txQuery += ' GROUP BY month';
    const txs = await this.dataSource.query(txQuery, txParams);

    // Merge by month
    const result: any = {};
    for (const s of sales) {
      result[s.month] = { month: s.month, total_sales: Number(s.total_sales), total_revenue: 0, total_expenses: 0, net_profit: 0 };
    }
    for (const t of txs) {
      if (!result[t.month]) result[t.month] = { month: t.month, total_sales: 0, total_revenue: 0, total_expenses: 0, net_profit: 0 };
      result[t.month].total_revenue = Number(t.total_revenue);
      result[t.month].total_expenses = Number(t.total_expenses);
    }
    for (const m of Object.keys(result)) {
      result[m].net_profit = result[m].total_revenue - result[m].total_expenses;
    }
    return Object.values(result).sort((a: any, b: any) => a.month.localeCompare(b.month));
  }

  async getTotalSales(from?: string, to?: string) {
    let query = `
      SELECT COALESCE(SUM(total_amount), 0) as total_sales
      FROM sales_orders
      WHERE 1=1`;
    const params: any[] = [];
    if (from && to) {
      query += ' AND created_at BETWEEN ? AND ?';
      params.push(from, to);
    } else if (from) {
      query += ' AND created_at >= ?';
      params.push(from);
    } else if (to) {
      query += ' AND created_at <= ?';
      params.push(to);
    }
    const [result] = await this.dataSource.query(query, params);
    return { total_sales: Number(result?.total_sales ?? 0), from, to };
  }

  async getBankBalances() {
    const query = `
      SELECT
        coa.id AS account_id,
        coa.account_name,
        coa.account_code,
        COALESCE(al.running_balance, 0) AS balance
      FROM chart_of_accounts coa
      JOIN account_types at ON coa.account_type = at.id
      LEFT JOIN (
        SELECT
          account_id,
          running_balance
        FROM account_ledger al1
        WHERE (al1.id, al1.account_id) IN (
          SELECT
            MAX(id) AS max_id,
            account_id
          FROM account_ledger
          GROUP BY account_id
        )
      ) al ON coa.id = al.account_id
      WHERE at.account_type = 'bank'
    `;
    return this.dataSource.query(query);
  }
} 