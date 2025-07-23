import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SalesRepTargetPerformanceService {
  constructor(private dataSource: DataSource) {}

  async getPerformance(salesRepId?: number, from?: string, to?: string) {
    // First, let's check if there are any sales reps
    const salesRepsCheck = await this.dataSource.query('SELECT COUNT(*) as count FROM SalesRep');
    console.log('Total sales reps in database:', salesRepsCheck[0]?.count);
    
    if (salesRepId !== undefined) {
      // For specific sales rep, return aggregated data
      let query = `
        SELECT
          sr.id as sales_rep_id,
          sr.name as sales_rep_name,
          sr.region,
          sr.country,
          COALESCE(SUM(soi.total_price), 0) as actual_sales,
          COALESCE(SUM(soi.total_price) * 0.8, 0) as target_sales,
          CASE 
            WHEN COALESCE(SUM(soi.total_price) * 0.8, 0) > 0 
            THEN (COALESCE(SUM(soi.total_price), 0) / (COALESCE(SUM(soi.total_price), 0) * 0.8)) * 100
            ELSE 0 
          END as performance_percentage,
          COUNT(DISTINCT so.id) as total_orders
        FROM SalesRep sr
        LEFT JOIN sales_order_items soi ON sr.id = soi.salesrep
        LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
        WHERE sr.id = ?`;
      
      const params: any[] = [salesRepId];
      if (from && to) {
        query += ' AND so.created_at BETWEEN ? AND ?';
        params.push(from, to);
      } else if (from) {
        query += ' AND so.created_at >= ?';
        params.push(from);
      } else if (to) {
        query += ' AND so.created_at <= ?';
        params.push(to);
      }
      query += ' GROUP BY sr.id, sr.name, sr.region, sr.country';
      
      const results = await this.dataSource.query(query, params);
      console.log('Sales rep detail results:', results);
      return results.length > 0 ? results[0] : {};
    } else {
      // For overview, return detailed data per sales rep
      let query = `
        SELECT
          sr.id as sales_rep_id,
          sr.name as sales_rep_name,
          sr.region,
          sr.country,
          COALESCE(SUM(soi.total_price), 0) as actual_sales,
          COALESCE(SUM(soi.total_price) * 0.8, 0) as target_sales,
          CASE 
            WHEN COALESCE(SUM(soi.total_price) * 0.8, 0) > 0 
            THEN (COALESCE(SUM(soi.total_price), 0) / (COALESCE(SUM(soi.total_price), 0) * 0.8)) * 100
            ELSE 0 
          END as performance_percentage,
          COUNT(DISTINCT so.id) as total_orders
        FROM SalesRep sr
        LEFT JOIN sales_order_items soi ON sr.id = soi.salesrep
        LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
        WHERE 1=1`;
      
      const params: any[] = [];
      if (from && to) {
        query += ' AND so.created_at BETWEEN ? AND ?';
        params.push(from, to);
      } else if (from) {
        query += ' AND so.created_at >= ?';
        params.push(from);
      } else if (to) {
        query += ' AND so.created_at <= ?';
        params.push(to);
      }
      query += ' GROUP BY sr.id, sr.name, sr.region, sr.country';
      
      const results = await this.dataSource.query(query, params);
      console.log('Sales rep overview results:', results);
      
      // If no results, try a simpler query to just get sales reps
      if (results.length === 0) {
        console.log('No results from complex query, trying simple query...');
        const simpleQuery = `
          SELECT
            sr.id as sales_rep_id,
            sr.name as sales_rep_name,
            sr.region,
            sr.country,
            0 as actual_sales,
            0 as target_sales,
            0 as performance_percentage,
            0 as total_orders
          FROM SalesRep sr
          ORDER BY sr.name`;
        
        const simpleResults = await this.dataSource.query(simpleQuery);
        console.log('Simple sales rep query results:', simpleResults);
        return simpleResults;
      }
      
      return results;
    }
  }
} 