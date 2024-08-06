import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

@Component({
  selector: 'app-barchart',
  standalone: true,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
          {
            label: "Mio t CO2-Äquivalente",
            data: [55.29, 51.17, 52.50, 53.34, 49.41, 48.89, 49.19, 48.22, 46.71, 46.47, 43.80, 45.14, 41.63],
            backgroundColor: 'white',
            barThickness: 12, // Feste Balkenbreite
            maxBarThickness: 20 // Maximale Balkenbreite
          },
        ]
      },
      options: {
        aspectRatio: 1,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              maxRotation: 90, // Maximale Rotation der Labels
              minRotation: 90, // Minimale Rotation der Labels
              color: 'white' // Textfarbe der X-Achsen-Ticks
            },
            grid: {
              display: false // Raster im Hintergrund entfernen
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white' // Textfarbe der Y-Achsen-Ticks
            },
            grid: {
              display: false // Raster im Hintergrund entfernen
            }
          }
        },
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 27,
                yMax: 27,
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  content: '27 Millionen Tonnen CO2',
                  //enabled: true,
                  position: 'end',
                  color: 'white' // Textfarbe des Labels
                }
              }
            }
          },
          legend: {
            labels: {
              color: 'red', // Textfarbe der Legende
            }
          }
        }
      }
    });
  }
}
