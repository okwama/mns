"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerPerformanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ManagerPerformanceService = class ManagerPerformanceService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getPerformance(managerId, from, to) {
        if (managerId !== undefined) {
            let query = `
        SELECT
          m.id as manager_id,
          m.name as manager_name,
          COUNT(DISTINCT sr.id) as team_size,
          COALESCE(SUM(soi.total_price), 0) as total_sales,
          COALESCE(SUM(soi.total_price) * 0.8, 0) as target_sales,
          CASE 
            WHEN COALESCE(SUM(soi.total_price) * 0.8, 0) > 0 
            THEN (COALESCE(SUM(soi.total_price), 0) / (COALESCE(SUM(soi.total_price), 0) * 0.8)) * 100
            ELSE 0 
          END as performance_percentage,
          COUNT(DISTINCT so.id) as total_orders,
          CASE 
            WHEN COUNT(DISTINCT so.id) > 0 
            THEN COALESCE(SUM(soi.total_price), 0) / COUNT(DISTINCT so.id)
            ELSE 0 
          END as average_order_value
        FROM managers m
        LEFT JOIN sales_rep_manager_assignments ma ON m.id = ma.manager_id
        LEFT JOIN SalesRep sr ON ma.sales_rep_id = sr.id
        LEFT JOIN sales_order_items soi ON sr.id = soi.salesrep
        LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
        WHERE m.id = ?`;
            const params = [managerId];
            if (from && to) {
                query += ' AND so.created_at BETWEEN ? AND ?';
                params.push(from, to);
            }
            else if (from) {
                query += ' AND so.created_at >= ?';
                params.push(from);
            }
            else if (to) {
                query += ' AND so.created_at <= ?';
                params.push(to);
            }
            query += ' GROUP BY m.id, m.name';
            const results = await this.dataSource.query(query, params);
            return results.length > 0 ? results[0] : {};
        }
        else {
            let query = `
        SELECT
          m.id as manager_id,
          m.name as manager_name,
          sr.id as sales_rep_id,
          sr.name as sales_rep_name,
          COALESCE(SUM(soi.quantity), 0) as total_items_sold,
          COALESCE(SUM(soi.total_price), 0) as total_sales
        FROM managers m
        JOIN sales_rep_manager_assignments ma ON m.id = ma.manager_id
        JOIN SalesRep sr ON ma.sales_rep_id = sr.id
        LEFT JOIN sales_order_items soi ON sr.id = soi.salesrep
        LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
        WHERE 1=1`;
            const params = [];
            if (from && to) {
                query += ' AND so.created_at BETWEEN ? AND ?';
                params.push(from, to);
            }
            else if (from) {
                query += ' AND so.created_at >= ?';
                params.push(from);
            }
            else if (to) {
                query += ' AND so.created_at <= ?';
                params.push(to);
            }
            query += ' GROUP BY m.id, m.name, sr.id, sr.name';
            return this.dataSource.query(query, params);
        }
    }
    async getOverview() {
        const managersCheck = await this.dataSource.query('SELECT COUNT(*) as count FROM managers');
        console.log('Total managers in database:', managersCheck[0]?.count);
        const query = `
      SELECT
        m.id as manager_id,
        m.name as manager_name,
        COUNT(DISTINCT sr.id) as team_size,
        COALESCE(SUM(soi.total_price), 0) as total_sales,
        COALESCE(SUM(soi.total_price) * 0.8, 0) as target_sales,
        CASE 
          WHEN COALESCE(SUM(soi.total_price) * 0.8, 0) > 0 
          THEN (COALESCE(SUM(soi.total_price), 0) / (COALESCE(SUM(soi.total_price), 0) * 0.8)) * 100
          ELSE 0 
        END as performance_percentage,
        COUNT(DISTINCT so.id) as total_orders,
        CASE 
          WHEN COUNT(DISTINCT so.id) > 0 
          THEN COALESCE(SUM(soi.total_price), 0) / COUNT(DISTINCT so.id)
          ELSE 0 
        END as average_order_value
      FROM managers m
      LEFT JOIN sales_rep_manager_assignments ma ON m.id = ma.manager_id
      LEFT JOIN SalesRep sr ON ma.sales_rep_id = sr.id
      LEFT JOIN sales_order_items soi ON sr.id = soi.salesrep
      LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
      GROUP BY m.id, m.name
      ORDER BY performance_percentage DESC`;
        const results = await this.dataSource.query(query);
        console.log('Manager overview results:', results);
        if (results.length === 0) {
            console.log('No results from complex query, trying simple query...');
            const simpleQuery = `
        SELECT
          m.id as manager_id,
          m.name as manager_name,
          0 as team_size,
          0 as total_sales,
          0 as target_sales,
          0 as performance_percentage,
          0 as total_orders,
          0 as average_order_value
        FROM managers m
        ORDER BY m.name`;
            const simpleResults = await this.dataSource.query(simpleQuery);
            console.log('Simple query results:', simpleResults);
            return simpleResults;
        }
        return results;
    }
    async getManagerSalesReps(managerId) {
        const query = `
      SELECT
        sr.id as sales_rep_id,
        sr.name as sales_rep_name,
        sr.region,
        sr.country,
        COALESCE(SUM(soi.total_price), 0) as total_sales,
        COUNT(DISTINCT so.id) as total_orders
      FROM SalesRep sr
      JOIN sales_rep_manager_assignments ma ON sr.id = ma.sales_rep_id
      LEFT JOIN sales_order_items soi ON sr.id = soi.salesrep
      LEFT JOIN sales_orders so ON soi.sales_order_id = so.id
      WHERE ma.manager_id = ? AND so.created_at BETWEEN '2024-01-01' AND '2024-12-31'
      GROUP BY sr.id, sr.name, sr.region, sr.country
      ORDER BY total_sales DESC`;
        return this.dataSource.query(query, [managerId]);
    }
};
exports.ManagerPerformanceService = ManagerPerformanceService;
exports.ManagerPerformanceService = ManagerPerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ManagerPerformanceService);
//# sourceMappingURL=manager-performance.service.js.map