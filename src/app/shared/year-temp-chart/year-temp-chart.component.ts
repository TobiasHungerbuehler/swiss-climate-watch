import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(annotationPlugin, ChartDataLabels);

@Component({
  selector: 'app-year-temp-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './year-temp-chart.component.html',
  styleUrls: ['./year-temp-chart.component.scss']
})
export class YearTempChartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyMidtempChart", {
      type: 'bar',
      data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: "Abweichung",
            data: [1.3, 0, 1.2, 1.2, 0.7, 0.8, 1.5, 1.1, 1.5, 0.3, 1.6, 1.4],
            type: 'line',
            borderColor: 'orange',
            backgroundColor: 'orange',
            borderWidth: 2,
            fill: false,
            yAxisID: 'y1',
            cubicInterpolationMode: 'monotone',
            datalabels: {
              anchor: 'end',
              align: 'top',
              backgroundColor: 'white',
              borderColor: 'orange',
              borderRadius: 5,
              borderWidth: 2,
              color: 'black',
              padding: 4,
              font: {
                weight: 'normal',

              }
            }
          },

          {
            label: "Mittlere Temperatur",
            data: [6.8, 5.8, 7.5, 7.5, 6.7, 6.7, 6.9, 6.5, 6.9, 5.8, 7.4, 7.2],
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 0,
            barThickness: 14, // Feste Balkenbreite 
            maxBarThickness: 20, // Maximale Balkenbreite
            categoryPercentage: 0.8,
            barPercentage: 0.9,
            datalabels: {
              anchor: 'end',
              align: 'end',
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderRadius: 4,
              borderWidth: 1,
              color: 'white',
              padding: 4,
              font: {
                weight: 'bold'
              }
            }
          }

        ]
      },
      options: {
        aspectRatio: 1,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              maxRotation: 90, // Maximale Rotation der Labels 2
              minRotation: 90, // Minimale Rotation der Labels
              color: 'white' // Textfarbe der X-Achsen-Ticks
            },
            grid: {
              display: false // Raster im Hintergrund entfernen
            }
          },
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 8,
            ticks: {
              color: 'white' // Textfarbe der Y-Achsen-Ticks
            },
            grid: {
              display: false // Raster im Hintergrund entfernen
            }
          },
          y1: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 8,
            position: 'right',
            ticks: {
              display: false // Deaktiviert die Anzeige der Ticks auf der rechten Y-Achse
            },
            grid: {
              display: false // Raster im Hintergrund entfernen
            }
          }
        },
        plugins: {
          datalabels: {
            display: true
          },
          legend: {
            labels: {
              color: 'white' // Textfarbe der Legende
            }
          }
        }
      }
    });
  }
}
