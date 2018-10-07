/**
 * Write a chart for parameter title, data and labels on the canvas.
 *
 * @param ctx  canvas
 * @param title
 * @param data
 * @param labels
 */
function doChart(ctx, title, data, labels) {
    // Let's prefill the parameters for this purpose of demonstration.
    ctx = document.getElementById("canvas").getContext('2d');
    title = 'Scheduled Route/Stop v delay (mins)';
    data = [4, 0, 3, 5, -1, 3];  // data and labels to come from database.
    labels = ["11 due 10:30", "66 due 10:33", "67 due 10:35", "44 due 10:45", "67 due 10:50", "11 due 10:55"];

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'delay in minutes',
                data: data ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: title
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            scales: {
                yAxes: [{
                    id: 'left-y-axis',
                    label: 'y label',
                    text: 'delay (mins)',
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}