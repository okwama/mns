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
exports.SalesRepTargetPerformanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let SalesRepTargetPerformanceService = class SalesRepTargetPerformanceService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getPerformance(salesRepId, from, to) {
        const salesRepsCheck = await this.dataSource.query('SELECT COUNT(*) as count FROM SalesRep');
        console.log('Total sales reps in database:', salesRepsCheck[0]?.count);
        if (salesRepId !== undefined) {
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
            const params = [salesRepId];
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
            query += ' GROUP BY sr.id, sr.name, sr.region, sr.country';
            const results = await this.dataSource.query(query, params);
            console.log('Sales rep detail results:', results);
            return results.length > 0 ? results[0] : {};
        }
        else {
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
            query += ' GROUP BY sr.id, sr.name, sr.region, sr.country';
            const results = await this.dataSource.query(query, params);
            console.log('Sales rep overview results:', results);
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
};
exports.SalesRepTargetPerformanceService = SalesRepTargetPerformanceService;
exports.SalesRepTargetPerformanceService = SalesRepTargetPerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SalesRepTargetPerformanceService);
//# sourceMappingURL=sales-rep-target-performance.service.js.map