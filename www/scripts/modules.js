var clock = function(mod, $){
        var endDate = new Date(2014, 0, 15)

        mod.init = function(){

            window.setInterval(tickTock,1000);
            tickTock()
        }

        var tickTock = function(){
            var curr = new Date()
            //console.log((endDate - curr)/(1000 * 60 *60 *24 ))
            var days = (endDate - curr)/(1000 * 60 *60 *24 )
            var hours = (days - Math.floor(days) )* 24
            var mins = (hours - Math.floor(hours)) *60
            var secs = (mins - Math.floor(mins)) *60

            $('#debt-days .debt-value').text( Math.floor(days) )
            $('#debt-hours .debt-value').text( Math.floor(hours) )
            $('#debt-mins .debt-value').text( Math.floor(mins) )
            $('#debt-secs .debt-value').text( Math.floor(secs) )

        }


        return mod;
    }({}, jQuery)

//        clock.init()



   var debtChart = function(mod, $){
        var svg,
            width,
            height,
            max,
            xAxis,
            yAxis,
            line,
            yearFormat = d3.time.format("%y")
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            padding = 25,
            budget = [{"year":1973,"revenue":230.8,"expense":245.7},{"year":1974,"revenue":263.2,"expense":269.4},{"year":1975,"revenue":279.1,"expense":332.3},{"year":1976,"revenue":298.1,"expense":371.8},{"year":1977,"revenue":355.6,"expense":409.2},{"year":1978,"revenue":399.6,"expense":458.7},{"year":1979,"revenue":463.3,"expense":504.0},{"year":1980,"revenue":517.1,"expense":590.9},{"year":1981,"revenue":599.3,"expense":678.2},{"year":1982,"revenue":617.8,"expense":745.7},{"year":1983,"revenue":600.6,"expense":808.4},{"year":1984,"revenue":666.4,"expense":851.8},{"year":1985,"revenue":734.0,"expense":946.3},{"year":1986,"revenue":769.2,"expense":990.4},{"year":1987,"revenue":854.3,"expense":1004.0},{"year":1988,"revenue":909.2,"expense":1064.4},{"year":1989,"revenue":991.1,"expense":1143.7},{"year":1990,"revenue":1032.0,"expense":1253.0},{"year":1991,"revenue":1055.0,"expense":1324.2},{"year":1992,"revenue":1091.2,"expense":1381.5},{"year":1993,"revenue":1154.3,"expense":1409.4},{"year":1994,"revenue":1258.6,"expense":1461.8},{"year":1995,"revenue":1351.8,"expense":1515.7},{"year":1996,"revenue":1453.1,"expense":1560.5},{"year":1997,"revenue":1579.2,"expense":1601.1},{"year":1998,"revenue":1721.7,"expense":1652.5},{"year":1999,"revenue":1827.5,"expense":1701.8},{"year":2000,"revenue":2025.2,"expense":1789.0},{"year":2001,"revenue":1991.1,"expense":1862.8},{"year":2002,"revenue":1853.1,"expense":2010.9},{"year":2003,"revenue":1782.3,"expense":2159.9},{"year":2004,"revenue":1880.1,"expense":2292.8},{"year":2005,"revenue":2153.6,"expense":2472.0},{"year":2006,"revenue":2406.9,"expense":2655.1},{"year":2007,"revenue":2568.0,"expense":2728.7},{"year":2008,"revenue":2524.0,"expense":2982.5},{"year":2009,"revenue":2105.0,"expense":3517.7},{"year":2010,"revenue":2162.7,"expense":3456.2},{"year":2011,"revenue":2302.5,"expense":3598.1},{"year":2012,"revenue":2450.2,"expense":3537.1}];

        mod.init = function(){

            getSizes()

            svg = d3.select("#debt-canvas").append("svg:svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var maxExpense = d3.max(budget, function(d){
                return d.expense;
            })

            var maxRevenue = d3.max(budget, function(d){
                return d.revenue;
            })
            max = maxExpense;
            if(maxRevenue > max){
                max = maxRevenue;
            }
            var y1 = d3.min(budget, function(d){return d.year;})
            var y2 = d3.max(budget, function(d){return d.year;})



            svg.append("g")
                  .attr("class", "x axis")
                  .attr("id", 'xaxis')

            svg.append("g")
                  .attr("class", "y axis")
                  .attr("id", 'yaxis')

            svg.append("path")
                  .datum(budget)
                  .attr('id', 'line-exp')

            svg.append("path")
                  .datum(budget)
                  .attr('id', 'line-rev')

            svg.append("svg:path")
                .datum(budget)
                .attr('id', 'deviation')

            resize();
            $(window).resize(function(){
                getSizes();
                resize();
            })
        }

        var resize = function(){

            d3.select("#debt-canvas svg")
                .attr('width', width)
                .attr('height', height)

            var x = d3.time.scale()
                .range([margin.left, width ])
                .domain([new Date(1973, 1, 1), new Date(2012, 1, 1)])

            var xLine = d3.scale.linear()
                .range([margin.left, width ])
                .domain([0, budget.length])

            var y = d3.scale.linear()
                .range([height - margin.top - margin.bottom, margin.bottom])
                .domain([0, max]);

            var area = d3.svg.area()
                .x(function(d,i) { console.log(i); return xLine(i); })
                .y(function(d) {  return y(d.expense); })
                .y0(function(d) {
                    if(d.revenue > d.expense){
                        return y(d.expense   );
                    } else {
                        return y(d.revenue   );
                    }
                     })

            xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                //.ticks(d3.time.years)
                //.tickFormat(yearFormat)

            yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            expline = d3.svg.line()
                .x(function(d,i) {  return xLine(i); })
                .y(function(d) { return y(d.expense); });

            revline = d3.svg.line()
                .x(function(d,i) {  return xLine(i); })
                .y(function(d) { return y(d.revenue); });

            svg.select('#xaxis')
                .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
                .call(xAxis);

            svg.select('#yaxis')
                .attr("transform", "translate(" + margin.left +",0)")
                .call(yAxis);

                svg.selectAll('#xaxis .tick line')
                    .attr('class', 'x-tick')
                    .attr('y1', 0 )
                    .attr('y2', 5)
                    .attr('x1', 0)
                    .attr('x2', 0)


            svg.select('#line-exp')
                .attr("d", expline);

            svg.select('#line-rev')
                .attr("d", revline);

            svg.select('#deviation')
                .attr("d", area)

        }

        var getSizes = function(){
            width = $('#debt-canvas').width()
            height = width * 9 / 16;

        }


        return mod;
    }({}, jQuery)




var approvalChart = function(mod, $){
        var svg,
            width,
            height,
            max,
            xAxis,
            yAxis,
            line,
            margin = {top: 20, right: 20, bottom: 10, left: 50},
            padding = 25,
            approval = {
                'r': [63,70,74],
                'd': [56,61,61],
                'o': [50,51,53]
            }

        mod.init = function(){

            getSizes()

            svg = d3.select("#approval-canvas").append("svg:svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")

            svg.append("g")
                  .attr("class", "x axis")
                  .attr("id", 'xaxis')

            svg.append("g")
                  .attr("class", "y axis")
                  .attr("id", 'yaxis')

            svg.append("path")
                  .datum(approval.r)
                  .attr('id', 'line-r')

            svg.append("path")
                  .datum(approval.d)
                  .attr('id', 'line-d')

            svg.append("path")
                  .datum(approval.o)
                  .attr('id', 'line-o')

            svg.selectAll('.dot-r')
                .data(approval.r)
                .enter()
                    .append('circle')
                    .attr('class','dot-r')
                    .attr('r', 5)


            svg.selectAll('.dot-d')
                .data(approval.d)
                .enter()
                    .append('circle')
                    .attr('class','dot-d')
                    .attr('r', 5)


            svg.selectAll('.dot-o')
                .data(approval.o)
                .enter()
                    .append('circle')
                    .attr('class','dot-o')
                    .attr('r', 5)

            svg.append("text")
                .text('Republicans in Congress')
                .style('text-anchor', 'end')
                .attr('id', 'lbl-r')
                .attr('class', 'approval-lbl')
                .attr('x', width)

            svg.append("text")
                .text('Democrats in Congress')
                .style('text-anchor', 'end')
                .attr('id', 'lbl-d')
                .attr('class', 'approval-lbl')
                .attr('x', width)

            svg.append("text")
                .text('Barack Obama')
                .style('text-anchor', 'end')
                .attr('id', 'lbl-o')
                .attr('class', 'approval-lbl')
                .attr('x', width)


            resize();
            $(window).resize(function(){
                getSizes();
                resize();
            })
        }

        var resize = function(){

            d3.select("#approval-canvas svg")
                .attr('width', width)
                .attr('height', height)

            var x = d3.scale.linear()
                .range([margin.left, width - margin.right ])
                .domain([0, 2]);


            var y = d3.scale.linear()
                .range([height - margin.top - margin.bottom, margin.bottom])
                .domain([0, 100]);


            xAxis = d3.svg.axis()
                .scale(x)
                .ticks(2)
                .tickFormat(function(d,i){
                    if(i == 0){
                        return 'Sep 25-29';
                    } else if(i == 1){
                        return 'Oct 2-6';
                    } else if( i == 2) {
                        return 'Oct 9-13';
                    }
                })
                .orient("bottom")


            yAxis = d3.svg.axis()
                .scale(y)
                .tickFormat(function(d,i){
                    if (i == 0){
                        return '0 %'
                    } else {
                        return d
                    }
                })
                .orient("left");

            line = d3.svg.line()
                .x(function(d,i) { return x(i); })
                .y(function(d) { return y(d); });



            svg.select('#xaxis')
                    .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
                    .call(xAxis);

            svg.select('#yaxis')
                    .attr("transform", "translate(" + margin.left +",0)")
                    .call(yAxis);


            svg.select('#line-r')
                     .attr("d", line);

            svg.select('#line-d')
                     .attr("d", line);

            svg.select('#line-o')
                     .attr("d", line);

            svg.selectAll('.dot-o')
                .attr('cx', function(d,i){
                    return x(i)
                })
                .attr('cy', y)

            svg.selectAll('.dot-r')
                .attr('cx', function(d,i){
                    return x(i)
                })
                .attr('cy', y)

            svg.selectAll('.dot-d')
                .attr('cx', function(d,i){
                    return x(i)
                })
                .attr('cy', y)

            svg.selectAll('#xaxis text')
                .style('text-anchor', function(i){
                    if(i == 0){
                        return 'start'
                    } else if( i == 1){
                        return 'middle'
                    } else if( i == 2){
                        return 'end'
                    }
                })

            svg.select('#lbl-r')
                .attr('y', y(approval.r[2]) - 5)
                .attr('x', width - margin.right)

            svg.select('#lbl-d')
                .attr('y', y(approval.d[2]) - 5)
                .attr('x', width - margin.right)

            svg.select('#lbl-o')
                .attr('y', y(approval.o[2]) + 15)
                .attr('x', width - margin.right)


        svg.selectAll('#xaxis .tick line')
            .attr('class', 'x-tick')
            .attr('y1', -10 )
            .attr('y2', 0)
            .attr('x1', 0)
            .attr('x2', 0)
            .style('stroke-width', 2)

        svg.selectAll('#yaxis line')
            .attr('class', 'y-tick')
            .attr('y1', 0 )
            .attr('y2', 0)
            .attr('x1', 0)
            .attr('x2', width - margin.right - margin.left)
        }

        var getSizes = function(){
            width = $('#approval-canvas').width()
            height = width * 9 / 16;

        }


        return mod;
    }({}, jQuery)




function startModules() {
    if (typeof (hasInited) == 'undefined') {
        console.log('init');
        clock.init();
        debtChart.init();
        approvalChart.init();

        hasInited = true;
    }
}