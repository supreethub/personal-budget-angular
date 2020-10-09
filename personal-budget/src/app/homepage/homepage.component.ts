import { AfterViewInit, Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'chart.js';
import { DataService } from '../data.service';
import * as d3 from 'd3';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#90EE90',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#F5DEB3',
                '#5F9EA0',
                '#00FFFF',
            ],
        }
    ],
    labels: []
};



  public d3DataSource = [{label: '', value:1}];
  public d3data = [];
  private svg;
  private margin = 50;
  private width = 500;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;


  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.d3DataSource.map(d => d.value.toString()))
  .range(['#90EE90',
  '#ff6384',
  '#36a2eb',
  '#fd6b19',
  '#F5DEB3',
  '#5F9EA0',
  '#00FFFF',]);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.value));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.d3DataSource))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.d3DataSource))
  .enter()
  .append('text')
  .text(d => d.data.label)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}



  // constructor(private http: HttpClient) { }

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.dataService.fetchData()
    .subscribe((res: any) => {
      console.log(res);
      for(var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();

        let obj = {label: res.myBudget[i].title, value: res.myBudget[i].budget};
        this.d3data[i] = obj;
      }
        this.d3DataSource = JSON.parse(JSON.stringify(this.d3data));
        this.createSvg();
        this.createColors();
        this.drawChart();
    });
  }

  createChart() {
    // var ctx = document.getElementById('myChart').getContext("2d");
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }
}
