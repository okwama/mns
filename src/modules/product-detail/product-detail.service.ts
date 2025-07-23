import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseHealthService } from '../../services/database-health.service';

@Injectable()
export class ProductDetailService {
  private readonly logger = new Logger(ProductDetailService.name);

  constructor(
    private dataSource: DataSource,
    private databaseHealthService: DatabaseHealthService,
  ) {}

  async getProductDetail(productId?: number, from?: string, to?: string) {
    let query = `
      SELECT
        p.id as product_id,
        p.product_name,
        p.category,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales,
        COUNT(DISTINCT pr.id) as report_count
      FROM products p
      LEFT JOIN sales_order_items soi ON p.id = soi.product_id
      LEFT JOIN ProductReport pr ON p.id = pr.productId
      WHERE 1=1`;
    const params: any[] = [];
    if (productId !== undefined) {
      query += ' AND p.id = ?';
      params.push(productId);
    }
    if (from && to) {
      query += ' AND soi.created_at BETWEEN ? AND ?';
      params.push(from, to);
    } else if (from) {
      query += ' AND soi.created_at >= ?';
      params.push(from);
    } else if (to) {
      query += ' AND soi.created_at <= ?';
      params.push(to);
    }
    query += ' GROUP BY p.id, p.product_name, p.category';
    return this.dataSource.query(query, params);
  }

  async getProductTimeSeries(productId?: number, from?: string, to?: string) {
    let query = `
      SELECT
        p.id as product_id,
        p.product_name,
        DATE(so.created_at) as date,
        COALESCE(SUM(soi.quantity), 0) as quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales
      FROM products p
      LEFT JOIN sales_order_items soi ON p.id = soi.product_id
      LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
      WHERE 1=1`;
    const params: any[] = [];
    if (productId !== undefined) {
      query += ' AND p.id = ?';
      params.push(productId);
    }
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
    query += ' GROUP BY p.id, p.product_name, DATE(so.created_at) ORDER BY date';
    return this.dataSource.query(query, params);
  }

  async getCategoryBreakdown(from?: string, to?: string) {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
        let query = `
          SELECT
            p.category,
            COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
            COALESCE(SUM(soi.total_price), 0) as total_sales
          FROM products p
          LEFT JOIN sales_order_items soi ON p.id = soi.product_id
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
        query += ' GROUP BY p.category ORDER BY total_sales DESC';
        return this.dataSource.query(query, params);
      } catch (error) {
        this.logger.error('Error in getCategoryBreakdown:', error);
        throw new Error(`Failed to get category breakdown: ${error.message}`);
      }
    });
  }

  async getSalesRepBreakdown(from?: string, to?: string) {
    let query = `
      SELECT
        sr.id as sales_rep_id,
        sr.name as sales_rep_name,
        p.id as product_id,
        p.product_name,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales
      FROM SalesRep sr
      INNER JOIN sales_order_items soi ON sr.id = soi.salesrep
      INNER JOIN products p ON soi.product_id = p.id
      INNER JOIN sales_orders so ON soi.sales_order_id = so.id
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
    query += ' GROUP BY sr.id, sr.name, p.id, p.product_name ORDER BY sr.name, p.product_name';
    return this.dataSource.query(query, params);
  }

  async getTopProducts(from?: string, to?: string, limit: number = 10, by: 'sales' | 'quantity' = 'sales') {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
        let query = `
          SELECT
            p.id as product_id,
            p.product_name,
            p.category,
            COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
            COALESCE(SUM(soi.total_price), 0) as total_sales
          FROM products p
          INNER JOIN sales_order_items soi ON p.id = soi.product_id
          INNER JOIN sales_orders so ON soi.sales_order_id = so.id
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
        query += ' GROUP BY p.id, p.product_name, p.category';
        if (by === 'quantity') {
          query += ' ORDER BY total_quantity_sold DESC';
        } else {
          query += ' ORDER BY total_sales DESC';
        }
        query += ' LIMIT ?';
        params.push(limit);
        return this.dataSource.query(query, params);
      } catch (error) {
        this.logger.error('Error in getTopProducts:', error);
        throw new Error(`Failed to get top products: ${error.message}`);
      }
    });
  }

  async getCountryRegionBreakdown(from?: string, to?: string) {
    let query = `
      SELECT
        c.name as country_name,
        p.id as product_id,
        p.product_name,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales
      FROM products p
      INNER JOIN sales_order_items soi ON p.id = soi.product_id
      INNER JOIN sales_orders so ON soi.sales_order_id = so.id
      INNER JOIN stores s ON so.created_by = s.id
      INNER JOIN Country c ON s.country_id = c.id
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
    query += ' GROUP BY c.name, p.id, p.product_name ORDER BY c.name, total_sales DESC';
    return this.dataSource.query(query, params);
  }

  async getClientBreakdown(from?: string, to?: string) {
    let query = `
      SELECT
        c.id as client_id,
        c.name as client_name,
        p.id as product_id,
        p.product_name,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales
      FROM products p
      INNER JOIN sales_order_items soi ON p.id = soi.product_id
      INNER JOIN sales_orders so ON soi.sales_order_id = so.id
      INNER JOIN Clients c ON so.client_id = c.id
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
    query += ' GROUP BY c.id, c.name, p.id, p.product_name ORDER BY c.name, p.product_name';
    return this.dataSource.query(query, params);
  }

  async getStoreBreakdown(from?: string, to?: string) {
    let query = `
      SELECT
        s.id as store_id,
        s.store_name,
        p.id as product_id,
        p.product_name,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales
      FROM products p
      INNER JOIN sales_order_items soi ON p.id = soi.product_id
      INNER JOIN sales_orders so ON soi.sales_order_id = so.id
      INNER JOIN stores s ON so.created_by = s.id
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
    query += ' GROUP BY s.id, s.store_name, p.id, p.product_name ORDER BY s.store_name, p.product_name';
    return this.dataSource.query(query, params);
  }

  async getMonthlyBreakdown(from?: string, to?: string) {
    let query = `
      SELECT
        DATE_FORMAT(so.created_at, '%Y-%m') as month,
        p.id as product_id,
        p.product_name,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales
      FROM products p
      INNER JOIN sales_order_items soi ON p.id = soi.product_id
      INNER JOIN sales_orders so ON soi.sales_order_id = so.id
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
    query += ' GROUP BY month, p.id, p.product_name ORDER BY month, p.product_name';
    return this.dataSource.query(query, params);
  }

  async getPerformanceVsTarget(from?: string, to?: string) {
    let query = `
      SELECT
        p.id as product_id,
        p.product_name,
        p.category,
        COALESCE(SUM(soi.quantity), 0) as total_quantity_sold,
        COALESCE(SUM(soi.total_price), 0) as total_sales,
        COALESCE(SUM(
          COALESCE(rt.vapes_targets, 0) + COALESCE(rt.pouches_targets, 0) +
          COALESCE(dt.vapes_targets, 0) + COALESCE(dt.pouches_targets, 0) +
          COALESCE(kt.vapes_targets, 0) + COALESCE(kt.pouches_targets, 0)
        ), 0) as total_target,
        CASE
          WHEN (
            SUM(
              COALESCE(rt.vapes_targets, 0) + COALESCE(rt.pouches_targets, 0) +
              COALESCE(dt.vapes_targets, 0) + COALESCE(dt.pouches_targets, 0) +
              COALESCE(kt.vapes_targets, 0) + COALESCE(kt.pouches_targets, 0)
            ) > 0
          ) THEN ROUND(SUM(soi.total_price) / SUM(
            COALESCE(rt.vapes_targets, 0) + COALESCE(rt.pouches_targets, 0) +
            COALESCE(dt.vapes_targets, 0) + COALESCE(dt.pouches_targets, 0) +
            COALESCE(kt.vapes_targets, 0) + COALESCE(kt.pouches_targets, 0)
          ) * 100, 2)
          ELSE 0
        END as percent_achieved
      FROM products p
      LEFT JOIN sales_order_items soi ON p.id = soi.product_id
      LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
      LEFT JOIN retail_targets rt ON p.id = rt.sales_rep_id
      LEFT JOIN distributors_targets dt ON p.id = dt.sales_rep_id
      LEFT JOIN key_account_targets kt ON p.id = kt.sales_rep_id
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
    query += ' GROUP BY p.id, p.product_name, p.category';
    return this.dataSource.query(query, params);
  }
} 