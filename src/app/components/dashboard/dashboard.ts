import { ChangeDetectorRef, Component, inject, OnInit, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { IAnalytics } from '../../models/iAnalytics';
import { Chart, ChartOptions, ChartDataset, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard  implements OnInit, AfterViewInit {
  analytics! :IAnalytics;
  private api = inject(AnalyticsService);
  private cd = inject(ChangeDetectorRef);
  private purchasesChart?: Chart;
  private categoryChart?: Chart;

  lineChartLabels: string[] = [];
  lineChartData: ChartDataset<'line'>[] = [
    {
      label: 'Purchases',
      data: [],
      fill: true,
      tension: 0.4,
      borderWidth: 3,
    },
  ];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  // ******** DOUGHNUT CHART (Purchases by Category) ********
  doughnutLabels: string[] = [];
  doughnutData: number[] = [];
  doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1400,
    }
  };
  ngOnInit() {
    this.api.getDashboardAnalytics().subscribe(data => {
      this.analytics = data;
      this.lineChartLabels = data.purchasesByMonth.map((m: { month: string }) => m.month);
      this.lineChartData[0].data = data.purchasesByMonth.map((m: { purchases: number }) => m.purchases);
      // ---- Doughnut chart (Categories) ----
      this.doughnutLabels = data.purchasesByCategory.map((c: { category: string }) => c.category);
      this.doughnutData = data.purchasesByCategory.map((c: { value: number }) => c.value);

      this.cd.detectChanges();
      this.initializeCharts();
    });
  }
    ngAfterViewInit() {
    // Charts will be initialized after data is loaded
  }

  private initializeCharts() {
    // Initialize Purchases Line Chart
    const purchasesCanvas = document.getElementById('purchasesChart') as HTMLCanvasElement;
    if (purchasesCanvas && this.lineChartLabels.length > 0) {
      if (this.purchasesChart) {
        this.purchasesChart.destroy();
      }
      this.purchasesChart = new Chart(purchasesCanvas, {
        type: 'line',
        data: {
          labels: this.lineChartLabels,
          datasets: this.lineChartData
        },
        options: this.lineChartOptions
      });
    }

    // Initialize Category Doughnut Chart
    const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (categoryCanvas && this.doughnutLabels.length > 0) {
      if (this.categoryChart) {
        this.categoryChart.destroy();
      }
      this.categoryChart = new Chart(categoryCanvas, {
        type: 'doughnut',
        data: {
          labels: this.doughnutLabels,
          datasets: [{
            data: this.doughnutData,
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
            ],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: this.doughnutOptions
      });
    }
  }

  ngOnDestroy() {
    // Clean up charts
    if (this.purchasesChart) {
      this.purchasesChart.destroy();
    }
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
  }
}
