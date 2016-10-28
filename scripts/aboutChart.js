//**********************Charting Data*******************************************
var canvas = $('#aboutMeChart').get(0);
console.log(canvas);
var data = {
  labels: [
    'Baseball Enthusiest',
    'Thinker/Knowledge Seeker',
    'Programmer',
    'Gamer',
    'Army Veteran',
    'Explorer',
  ],
  datasets: [
    {
      data: [30, 20, 20, 15, 10, 5],
      backgroundColor: [
        'red', 'orange','yellow', 'green', 'blue', 'indigo'
      ]
    }]
};

function drawChart() {

  var personalityChart = new Chart(canvas,{
    type: 'pie',
    data: data,
    options: {responsive: false},
    scales: [{ticks:{ beginAtZero:true}}] });
}
drawChart();
