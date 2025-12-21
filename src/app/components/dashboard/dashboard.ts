// import { ChangeDetectorRef, Component, inject, OnInit, AfterViewInit  } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AnalyticsService } from '../../services/analytics/analytics.service';
// import { IAnalytics } from '../../models/iAnalytics';
// import { Chart, ChartOptions, ChartDataset, registerables } from 'chart.js';
// Chart.register(...registerables);
// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule ],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css',
// })
// export class Dashboard  implements OnInit, AfterViewInit {
//   analytics! :IAnalytics;
//   private api = inject(AnalyticsService);
//   private cd = inject(ChangeDetectorRef);
//   private purchasesChart?: Chart;
//   private categoryChart?: Chart;

//   lineChartLabels: string[] = [];
//   lineChartData: ChartDataset<'line'>[] = [
//     {
//       label: 'Purchases',
//       data: [],
//       fill: true,
//       tension: 0.4,
//       borderWidth: 3,
//     },
//   ];
//   lineChartOptions: ChartOptions<'line'> = {
//     responsive: true,
//     animation: {
//       duration: 1200,
//       easing: 'easeOutQuart'
//     },
//     scales: {
//       y: { beginAtZero: true },
//     },
//   };
//   // ******** DOUGHNUT CHART (Purchases by Category) ********
//   doughnutLabels: string[] = [];
//   doughnutData: number[] = [];
//   doughnutOptions: ChartOptions<'doughnut'> = {
//     responsive: true,
//     animation: {
//       animateRotate: true,
//       animateScale: true,
//       duration: 1400,
//     }
//   };
//   ngOnInit() {
//     this.api.getDashboardAnalytics().subscribe(data => {
//       console.log(data);

//       this.analytics = data;
//       this.lineChartLabels = data.purchasesByMonth.map((m: { month: string }) => m.month);
//       this.lineChartData[0].data = data.purchasesByMonth.map((m: { purchases: number }) => m.purchases);
//       // ---- Doughnut chart (Categories) ----
//       this.doughnutLabels = data.purchasesByCategory.map((c: { category: string }) => c.category);
//       this.doughnutData = data.purchasesByCategory.map((c: { value: number }) => c.value);

//       this.cd.detectChanges();
//       this.initializeCharts();
//     });
//   }
//     ngAfterViewInit() {
//     // Charts will be initialized after data is loaded
//   }

//   private initializeCharts() {
//     // Initialize Purchases Line Chart
//     const purchasesCanvas = document.getElementById('purchasesChart') as HTMLCanvasElement;
//     if (purchasesCanvas && this.lineChartLabels.length > 0) {
//       if (this.purchasesChart) {
//         this.purchasesChart.destroy();
//       }
//       this.purchasesChart = new Chart(purchasesCanvas, {
//         type: 'line',
//         data: {
//           labels: this.lineChartLabels,
//           datasets: this.lineChartData
//         },
//         options: this.lineChartOptions
//       });
//     }

//     // Initialize Category Doughnut Chart
//     const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
//     if (categoryCanvas && this.doughnutLabels.length > 0) {
//       if (this.categoryChart) {
//         this.categoryChart.destroy();
//       }
//       this.categoryChart = new Chart(categoryCanvas, {
//         type: 'doughnut',
//         data: {
//           labels: this.doughnutLabels,
//           datasets: [{
//             data: this.doughnutData,
//             backgroundColor: [
//               'rgba(59, 130, 246, 0.8)',
//               'rgba(16, 185, 129, 0.8)',
//               'rgba(249, 115, 22, 0.8)',
//               'rgba(139, 92, 246, 0.8)',
//               'rgba(236, 72, 153, 0.8)',
//             ],
//             borderWidth: 2,
//             borderColor: '#fff'
//           }]
//         },
//         options: this.doughnutOptions
//       });
//     }
//   }

//   ngOnDestroy() {
//     // Clean up charts
//     if (this.purchasesChart) {
//       this.purchasesChart.destroy();
//     }
//     if (this.categoryChart) {
//       this.categoryChart.destroy();
//     }
//   }
// }
// import { ChangeDetectorRef, Component, inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AnalyticsService } from '../../services/analytics/analytics.service';
// import { IAnalytics, IPurchasesByCategory, PurchasesOverviewItem } from '../../models/iAnalytics'; // Assuming you have this interface
// import { Chart, ChartOptions, ChartDataset, registerables } from 'chart.js';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './dashboard.html',
//   styleUrls: ['./dashboard.css'],
// })
// export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
//   analytics!: IAnalytics;
//   private api = inject(AnalyticsService);
//   private cd = inject(ChangeDetectorRef);
//   private purchasesChart?: Chart;
//   private categoryChart?: Chart;

//   // Line Chart for Purchases Overview
//   lineChartLabels: string[] = [];
//   lineChartData: ChartDataset<'line'>[] = [
//     {
//       label: 'Purchases',
//       data: [],
//       fill: true,
//       tension: 0.4,
//       borderWidth: 3,
//     },
//   ];
//   lineChartOptions: ChartOptions<'line'> = {
//     responsive: true,
//     animation: {
//       duration: 1200,
//       easing: 'easeOutQuart'
//     },
//     scales: {
//       y: { beginAtZero: true },
//     },
//   };

//   // Doughnut Chart for Purchases by Category
//   doughnutLabels: string[] = [];
//   doughnutData: number[] = [];
//   doughnutOptions: ChartOptions<'doughnut'> = {
//     responsive: true,
//     animation: {
//       animateRotate: true,
//       animateScale: true,
//       duration: 1400,
//     }
//   };

//   ngOnInit() {
//     // Fetch data for the dashboard
//     this.api.getDashboardAnalytics().subscribe({
//       next:(data)=>{
//         console.log('Analytics data:', data);

//         this.analytics = data;

//         // Update Line Chart - Purchases Overview
//         this.lineChartLabels = data.purchasesOverview.map((item:PurchasesOverviewItem) => item._id.toString()); // Month or Date
//         this.lineChartData[0].data = data.purchasesOverview.map((item:PurchasesOverviewItem) => item.totalPurchases);

//         // Update Doughnut Chart - Purchases by Category
//         this.doughnutLabels = data.purchasesByCategory.map((item:IPurchasesByCategory) => item._id); // Category IDs
//         this.doughnutData = data.purchasesByCategory.map((item:IPurchasesByCategory) => item.totalPurchases);

//         // Trigger change detection
//         this.cd.detectChanges();
//         // Initialize charts after the data is set
//         this.initializeCharts();
//       },
//       error:(error)=>{
//         console.log(error);
//       }
//     });
//   }

//   ngAfterViewInit() {
//     // Ensure the charts are initialized after the view is ready
//   }

//   private initializeCharts() {
//     // Initialize Purchases Overview Line Chart
//     const purchasesCanvas = document.getElementById('purchasesChart') as HTMLCanvasElement;
//     if (purchasesCanvas && this.lineChartLabels.length > 0) {
//       if (this.purchasesChart) {
//         this.purchasesChart.destroy();
//       }
//       this.purchasesChart = new Chart(purchasesCanvas, {
//         type: 'line',
//         data: {
//           labels: this.lineChartLabels,
//           datasets: this.lineChartData
//         },
//         options: this.lineChartOptions
//       });
//     }

//     // Initialize Category Doughnut Chart
//     const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
//     if (categoryCanvas && this.doughnutLabels.length > 0) {
//       if (this.categoryChart) {
//         this.categoryChart.destroy();
//       }
//       this.categoryChart = new Chart(categoryCanvas, {
//         type: 'doughnut',
//         data: {
//           labels: this.doughnutLabels,
//           datasets: [{
//             data: this.doughnutData,
//             backgroundColor: [
//               'rgba(59, 130, 246, 0.8)', // Blue
//               'rgba(16, 185, 129, 0.8)', // Green
//               'rgba(249, 115, 22, 0.8)', // Orange
//               'rgba(139, 92, 246, 0.8)', // Purple
//               'rgba(236, 72, 153, 0.8)', // Pink
//             ],
//             borderWidth: 2,
//             borderColor: '#fff'
//           }]
//         },
//         options: this.doughnutOptions
//       });
//     }
//   }

//   ngOnDestroy() {
//     // Clean up charts to avoid memory leaks
//     if (this.purchasesChart) {
//       this.purchasesChart.destroy();
//     }
//     if (this.categoryChart) {
//       this.categoryChart.destroy();
//     }
//   }
// }



import { ChangeDetectorRef, Component, inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { IAnalytics, IPurchasesByCategory, PurchasesOverviewItem } from '../../models/iAnalytics';
import { Chart, ChartOptions, ChartDataset, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  analytics!: IAnalytics;
  private api = inject(AnalyticsService);
  private cd = inject(ChangeDetectorRef);
  private purchasesChart?: Chart;
  private categoryChart?: Chart;

  // Month names for better display
  private monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Line Chart for Purchases Overview
  lineChartLabels: string[] = [];
  lineChartData: ChartDataset<'line'>[] = [
    {
      label: 'Purchases',
      data: [],
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
  ];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  // Doughnut Chart for Purchases by Category
  doughnutLabels: string[] = [];
  doughnutData: number[] = [];
  doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1400,
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  };

  ngOnInit() {
    this.fetchAnalytics();
  }

  ngAfterViewInit() {
    // Charts will be initialized after data is loaded
  }

  private fetchAnalytics() {
    this.api.getDashboardAnalytics().subscribe({
      next: (data) => {
        console.log('Analytics data:', data);
        this.analytics = data;

        // Update Line Chart - Purchases Overview
        this.lineChartLabels = data.purchasesOverview.map((item: PurchasesOverviewItem) =>
          this.monthNames[item._id - 1] || `Month ${item._id}`
        );
        this.lineChartData[0].data = data.purchasesOverview.map((item: PurchasesOverviewItem) =>
          item.totalPurchases
        );

        // Update Doughnut Chart - Purchases by Category
        // You might want to map category IDs to names here
        this.doughnutLabels = data.purchasesByCategory.map((item: IPurchasesByCategory) =>
          `Category ${item.category}` // Shorten the ID for display
          // `Category ${item._id.substring(0, 6)}...` // Shorten the ID for display
        );
        this.doughnutData = data.purchasesByCategory.map((item: IPurchasesByCategory) =>
          item.totalPurchases
        );

        // Trigger change detection
        this.cd.detectChanges();

        // Initialize charts after the data is set
        this.initializeCharts();
      },
      error: (error) => {
        console.error('Error fetching analytics:', error);
      }
    });
  }

  private initializeCharts() {
    // Initialize Purchases Overview Line Chart
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
              'rgba(59, 130, 246, 0.8)', // Blue
              'rgba(16, 185, 129, 0.8)', // Green
              'rgba(249, 115, 22, 0.8)', // Orange
              'rgba(139, 92, 246, 0.8)', // Purple
              'rgba(236, 72, 153, 0.8)', // Pink
            ],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: this.doughnutOptions
      });
    }
  }

  // Helper method to format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  ngOnDestroy() {
    // Clean up charts to avoid memory leaks
    if (this.purchasesChart) {
      this.purchasesChart.destroy();
    }
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
  }
}
