/* 
    *
    *
    *
    Danielle Carrick 
    www.daniellecarrick.com 
    *
    *
    *
    *
    */

   function draw() {

    d3.select('#scatterplot').remove();
    d3.select('#wrapper').append('div').attr('id', 'scatterplot');

    var maxWidth = document.getElementById('wrapper').clientWidth;

    var margin = { top: 20, right: 10, bottom: 30, left: 0 };
    width = maxWidth - margin.left - margin.right,
        height = window.innerHeight - margin.top - margin.bottom - 230;

    if (window.innerWidth < 400) {
        var styles = {
            numberOfTicks: d3.timeMonth.every(2),
            radiusRange: [2, 4],
            formatDate: d3.timeFormat("%b"),
            enableBrush: false,
            mobile: true
        }
    } else {
        var styles = {
            numberOfTicks: d3.timeMonth.every(1),
            radiusRange: [3, 15],
            formatDate: d3.timeFormat("%b"),
            enableBrush: true,
            mobile: false
        }
    }

    var x = d3.scaleTime()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var r = d3.scaleLinear()
        .range(styles.radiusRange);

    // light pink #fde1d7 dark pink #e28b89 // red #ed1d24
    var color = d3.scaleLinear()
        //.range(['#d16c6a', '#fde1d7']);
         .range(['#ed1d24', '##ed1d24']);
            //.domain([1000000, 500000, 100000])

    var opacity = d3.scaleLinear()
        .range([0.1, 1])
        .domain([10000, 1000000]);

    // parse the given data into something the computer understands
    //var parseTime = d3.timeParse("%m-%d-%Y %H:%M:%S");
    var parseTime = d3.timeParse("%_m/%_d/%_y %H:%M");

    // Now format the date to something people can understand
    var formatDate = d3.timeFormat("%b");

    var formatEngagment = d3.format('.2s');

    var xAxis = d3.axisBottom(x)
        //.ticks(styles.numberOfTicks)
        .ticks(styles.numberOfTicks)
        .tickSize(3)
        //.tickFormat(formatDate)
        .tickFormat(function(d) {
            var s = formatDate(d);
            return this.parentNode.nextSibling ?
                s :
                s + "  '18";
        });

    var yAxis = d3.axisRight(y)
        .tickSize(width)
        .tickFormat(function(d) {
            var s = formatEngagment(d);
            return this.parentNode.nextSibling ?
                s :
                s + " retweets and favorites";
        });


    var brush = d3.brush().extent([
            [0, 0],
            [width, height]
        ]).on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    var calculateRadius = function(area) {
        var result = Math.sqrt(area / Math.PI);
        return result;
    }

    var svg = d3.select("#scatterplot").append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    var scatter = svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");

    /*** TOOLTIP ***/

    tip = d3.tip()
        .html(function(d) {
            return '<span class="tip-text">' + d.text + '</span><br /><span class="tip-details">' + formatDate(d.created_at) + ' | ' + formatEngagment(d.total_social) + ' engagements';
        })
        .attr('class', 'd3-tip')
        .direction(function(d) {
            if (d.created_at < 1488344400000) { // equivalent to March 2017
                return 'e';
            } else if (d.created_at > 1513314000000) { // equivalent to Dec 15 2017
                return 'w';
            } else if (d.total_social > 800000) {
                return 's';
            } else {
                return 'n';
            }
        })
        .offset([0, 3])

    svg.call(tip);


    /*************
    Where the magic happens
    **************/

    d3.csv("tweets.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.created_at = parseTime(d.created_at);
            d.retweet_count = +d.retweet_count;
            d.favorite_count = +d.favorite_count;
            d.total_social = +d.retweet_count + +d.favorite_count;
            /* if(d.is_retweet === 'TRUE') {
                 data.splice(data.indexOf(d),1);
                // causing errors on elements before/after
             }*/
        });

        var xExtent = d3.extent(data, function(d) { return d.created_at; });
        var yExtent = d3.extent(data, function(d) { return d.total_social; });
        x.domain([new Date('2017', '00', '10'), new Date('2018', '00', '25')]);
        y.domain(yExtent).nice();
        r.domain(d3.extent(data, function(d) { return calculateRadius(d.total_social); }));
        color.domain([d3.max(data, function(d) {
            return d.total_social;
        }), d3.min(data, function(d) {
            return d.total_social;
        })]);

        // x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr('id', "axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // y axis
        svg.append("g")
            .call(customYAxis);

        var keywords = {
            "all": [' '],
            "fakenews": ['fake news', 'Fake News', '#fakenews'],
            "media": ['fox', 'Fox', 'FOX', 'CNN', 'NBC', 'cnn', 'nbc', 'New York Times', 'NY Times', 'new york times'],
            "clinton": ['Hilary', 'Hillary', 'Clinton'],
            "obama": ['obama', "Obama"],
            "north-korea": ['north korea', 'North Korea', 'North Korean', 'Jong'],
            "russia": ['russia', 'putin', 'collusion', 'moscow'],
            "maga": ['maga', 'MAGA', 'Make America Great Again', 'MAKE AMERICA GREAT']
        }


        d3.select('.button-group').selectAll('button.filter').on('click', function() {
            var selectedFilter = this.value;
            var filter = keywords[selectedFilter];
            // top 100 cant be filtered on text
            if (selectedFilter != 'top') {
                var filteredData = data.filter(tweet => filterText(tweet.text, filter));
                updateChart(filteredData);
            } else {
                var maxTweets = 100;
                var sortedData = data.sort(function compareNumbers(a, b) {
                    return b.total_social - a.total_social;
                })
                var topTweets = sortedData.slice(0, maxTweets);
                // console.log(filteredData);
                updateChart(topTweets);
            }
            d3.selectAll('button.filter').classed('selected', false);
            d3.select(this).classed('selected', !d3.select(this).classed('selected'));
        });

        d3.select('.custom-select select').on('change', function() {
            console.log('changed');
            var selectedFilter = this.value;
            var filter = keywords[selectedFilter];
            // top 100 cant be filtered on text
            if (selectedFilter != 'top') {
                var filteredData = data.filter(tweet => filterText(tweet.text, filter));
                updateChart(filteredData);
            }
        })


        function filterText(str, items) {
            for (var i in items) {
                var item = items[i];
                if (str.indexOf(item) > -1) {
                    return true;
                }
            }
            return false;
        }

        function updateChart(data) {

            // need to repeat styles for filters to work..
            var dot = scatter.selectAll(".dot")
                .data(data);

            //dot.transition().duration(300);

           dot.attr("class", "dot")
                .attr("r", function(d) { return r(calculateRadius(d.total_social)); })
                .attr("cx", function(d) { return x(d.created_at); })
                .attr("cy", function(d) { return y(d.total_social); })
                .attr("opacity", function(d) {
                    return opacity(d.total_social)
                })
                .style("fill", function(d) {
                    return color(d.total_social)
                });

            

            // animation for updating  dots
           // dot.transition().duration(300);

            dot.enter().append("circle")//.transition().duration(300)
                .attr("class", "dot")
                .attr("r", function(d) { return r(calculateRadius(d.total_social)); })
                .attr("cx", function(d) { return x(d.created_at); })
                .attr("cy", function(d) { return y(d.total_social); })
                .attr("opacity", function(d) {
                    return opacity(d.total_social)
                })
                .style("fill", function(d) {
                    return color(d.total_social)
                }).on('mouseover', tip.show)
                .on('mouseout', tip.hide);

             


            // animation for exiting dots
            dot.exit().transition().duration(300).attr('r', 0).attr('opacity', 0).remove();
        }
        updateChart(data);

        d3.selectAll('.reset').on('click', reset);

        /*d3.select('button#top').on('click', function(d) {
            var maxTweets = 100;
            var sortedData = data.sort(function compareNumbers(a, b) {
                return b.total_social - a.total_social;
            })
            var topTweets = sortedData.slice(0, maxTweets);
            // console.log(filteredData);
            updateChart(topTweets);
        });*/

        function reset() {
            console.log('zoom clicked');
            var t = scatter.transition().duration(750);
            x.domain(xExtent).nice();
            y.domain(yExtent).nice();
            svg.select("#axis--x").transition(t).call(xAxis);
            svg.select("#axis--y").transition(t).call(customYAxis);
            scatter.selectAll("circle").transition(t)
                .attr("cx", function(d) { return x(d.created_at); })
                .attr("cy", function(d) { return y(d.total_social); });
        }


    }); // end of d3.csv

    // disable brush on mobile
    if (!styles.mobile) {
        scatter.append("g")
            .attr("class", "brush")
            .call(brush);
    }

    function brushended() {

        var s = d3.event.selection;
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            x.domain(d3.extent(data, function(d) { return d.created_at; })).nice();
            y.domain(d3.extent(data, function(d) { return d.total_social; })).nice();
        } else {

            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            scatter.select(".brush").call(brush.move, null);
        }
        zoom();
    }

    function idled() {
        idleTimeout = null;
    }

    function customYAxis(g) {
        g.attr("class", "y axis")
        g.attr('id', "axis--y")
        g.call(yAxis);
        g.select(".domain").remove();
        g.selectAll(".tick line").attr("stroke", "#ccc").attr("stroke-dasharray", "2,2");
        g.selectAll(".tick text").attr("x", 0).attr("dy", -4);
    }

    function zoom() {

        var t = scatter.transition().duration(750);
        svg.select("#axis--x").transition(t).call(xAxis);
        svg.select("#axis--y").transition(t).call(customYAxis);
        scatter.selectAll("circle").transition(t)
            .attr("cx", function(d) { return x(d.created_at); })
            .attr("cy", function(d) { return y(d.total_social); });
    }
}

draw();
window.addEventListener("resize", draw);