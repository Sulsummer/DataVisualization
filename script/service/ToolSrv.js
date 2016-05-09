app.service('ToolSrv', [function(){
    var _this_ = this;
    
    this.getLargestCount = function(arr, count){
        var large = 0;
        for(var i in arr){
            for(var item in arr[i]){
                if(item === count){
                    large = large > (arr[i][item]-0) ? large : (arr[i][item]-0);
                }
            }
        }
        return large;
    }

    this.vehicleCountPieChart = function(data, node, nodeClass){
        var chart = {
                data: data,
                node: node,
                nodeClass: nodeClass,
                width: node.width(),
                height: node.height(),
                radius: 150,
                colors: d3.scale.category20(),
                colrosb: d3.scale.category20b(),
                colrosc: d3.scale.category20c(),
                svg: null,
                bodyG: null,
                pieG: null
            },
            that = chart;

        chart.renderSvg = function(){
            if(!this.svg){
                this.svg = d3.select(nodeClass).append('svg')
                        .attr('width', this.width)
                        .attr('height', this.height);
            }
            return this;
        }

        chart.renderBody = function(){
            if(!this.bodyG && this.svg){
                this.bodyG = this.svg.append('g');
            }
            return this;
        }

        chart.renderPie = function(){
            var pie = d3.layout.pie()
                        .value(function(d){
                            return d.vCount;
                        });


            var arc = d3.svg.arc()
                        .outerRadius(that.radius)
                        .innerRadius(0);


            if(!this.pieG){
                this.pieG = this.bodyG.append('g')
                            .attr('class', 'pie')
                            .attr('transform', 'translate(150,150)');
            }

            this._renderSlices_(pie, arc);
            //this._renderLabel_(pie, arc);

            return this;
        }

        chart._renderSlices_ = function(pie, arc){
            var slices = this.pieG.selectAll("path")
                    .data(pie(that.data));

            slices.enter()
                    .append("path")
                    .attr("class", "arc")
                    .attr("class", function(d, i){
                        return 'piechart-'+i;
                    })
                    .style("fill", function (d, i) {
                        return that._colors_(i);
                    })
                    .on("mouseover",function(d, i){
                        d3.select(this)
                            .style({
                                "fill": "yellow"
                            });
                    })
                    .on("mouseout",function(d, i){
                        d3.select(this)
                            .transition()
                            .duration(150)
                            .style("fill", function(d) { 
                                return that._colors_(i); 
                            });
                    })
                    .on('click', function(d, i){
                        _this_.data = d.data;
                    });
            slices.transition()
                    .attrTween("d", function (d) {
                        var currentArc = this.__current__;
                        if (!currentArc){
                            currentArc = {startAngle: 0, endAngle: 0};
                        }
                        var interpolate = d3.interpolate(currentArc, d);
                                            
                        this.__current__ = interpolate(1);
                        
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });
        }

        // chart._renderLabel_ = function(pie, arc){  
        //     var labels = this.pieG.selectAll("text.piechart-text")
        //             .data(pie(that.data));
            
        //     labels.enter()
        //             .append("text")
        //             .attr("class", function(d, i){
        //                 return 'piechart-'+i+' piechart-text';
        //             });
            
        //     labels.transition()
        //             .attr("transform", function (d) {
        //                 return "translate(" 
        //                     + arc.centroid(d) + ")"; // <-F
        //             })
        //             .attr("dy", ".35em")
        //             .attr("text-anchor", "middle")
        //             .text(function (d) {
        //                 return d.data.id;
        //             })
        //             .style({
        //                 'display': 'none',
        //                 'fill': 'black'
        //             });
        // }

        chart._colors_ = function(c){
            var color;
            switch(c%3){
                case 0:
                    color = this.colors;
                break;
                case 1:
                    color = this.colrosb;
                break;
                case 2:
                    color = this.colrosc;
                break;
            }
            return color((c+1)%20);
        }


        return chart;
    }

    this.vehicleCountBarChart = function(data, node, nodeClass){
        var chart = {
                data: data,
                node: node,
                nodeClass: nodeClass,
                width: node.width(),
                height: node.height(),
                offset: 50,
                offsetWidth: 0,
                offsetHeight: 0,
                barWidth: 0,
                svg: null,
                bodyG: null,
                barG: null,
                xScale: null,
                yScale: null,
                xAxis: null,
                yAxis: null
            },
            that = chart;

        chart.offsetWidth = chart.width - chart.offset*2;
        chart.offsetHeight = chart.height - chart.offset*2;
        chart.barWidth = Math.floor(chart.offsetWidth/chart.data.length);

        chart.renderSvg = function(){
            this.svg = d3.select(nodeClass).append('svg')
                        .style({
                            'width': that.width,
                            'height': that.height
                        });
            return this;
        }

        chart.renderBody = function(){
            if(this.svg){
                this.bodyG = this.svg.append('g');
            }
            return this;
        }

        chart.renderAxis = function(){
            var largestPC = _this_.getLargestCount(that.data, 'vCount');
            //console.log(that.data);
            this.xScale = d3.scale.linear()
                            .domain([0, that.data.length])
                            .range([0, that.offsetWidth]);

            this.yScale = d3.scale.linear()
                            .domain([0, largestPC])
                            .range([that.offsetHeight, 0]);

            this.xAxis = d3.svg.axis()
                            .scale(that.xScale)
                            .orient('bottom');

            this.yAxis = d3.svg.axis()
                            .scale(that.yScale)
                            .orient('left')
                            .ticks(5);

            this.bodyG.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(' + that.offset + ',' + (that.offset+that.offsetHeight) + ')')
                        .call(that.xAxis);

            this.bodyG.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(' + that.offset + ',' + (that.offset) + ')')
                        .call(that.yAxis);

            return this;
        }

        chart.renderBar = function(){
            var barPadding = 4;
            this.barG = this.bodyG.selectAll('rect')
                            .data(that.data)
                            .enter()
                            .append('rect')
                            .attr('x', function(d, i){
                                return barPadding/2 + that.offset + i*Math.ceil(that.offsetWidth/that.data.length);
                            })
                            .attr('y', function(d, i){
                                return that.yScale(d.vCount);
                            })
                            .attr('width', function(){
                                return that.barWidth;
                            })
                            .attr('height', function(d, i){
                                return that.offsetHeight - that.yScale(d.vCount);
                            })
                            .attr('transform', 'translate(' + 0 + ',' + that.offset + ')')
                            .attr('class', function(d, i){
                                return 'barchart-' + i;
                            })
                            .on("mouseover",function(d, i){
                                d3.select(this)
                                    .style({
                                        "fill": "yellow"
                                    });
                                d3.select('text.barchart-'+i)
                                    .style({
                                        'display': 'block'
                                    });

                            })
                            .on("mouseout",function(d, i){
                                d3.select(this)
                                    .transition()
                                    .duration(100)
                                    .style({ 
                                        'fill': 'rgba(23, 107, 228, 0.67)' 
                                    });
                                d3.select('text.barchart-'+i)
                                    .style({
                                        'display': 'none'
                                    });
                            })
                            .style({
                                'fill': 'rgba(23, 107, 228, 0.67)'
                            });
            return this;
        }

        chart.renderLabel = function(){
            var labels = this.bodyG.selectAll("text.barchart-text")
                            .data(that.data)
                            .enter()
                            .append("text")
                            .attr("class","barchart-text")
                            .attr("class", function(d, i){
                                return 'barchart-'+i;
                            })
                            .attr("transform","translate(" + 0 + "," + 0 + ")")
                            .attr("x", function(d,i){
                                return that.barWidth*i;
                            } )
                            .attr("y",function(d){
                                return that.offset;
                            })
                            .attr("dx",function(){
                                // return (xScale.rangeBand() - rectPadding)/2;
                            })
                            .attr("dy",function(d){
                                // return 20;
                            })
                            .text(function(d){
                                return d.id+': '+d.vCount;
                            })
                            .style({
                                'display': 'none',
                                'fill': 'black'
                            });
        }

        return chart;
    }

    this.vehiclePassengerBarChart = function(data, node, nodeClass){
        var chart = {
                data: data,
                node: node,
                nodeClass: nodeClass,
                width: node.width(),
                height: node.height(),
                offset: 50,
                offsetWidth: 0,
                offsetHeight: 0,
                barWidth: 0,
                svg: null,
                bodyG: null,
                barG: null,
                xScale: null,
                yScale: null,
                xAxis: null,
                yAxis: null
            },
            that = chart;

        chart.offsetWidth = chart.width - chart.offset*2;
        chart.offsetHeight = chart.height - chart.offset*2;
        chart.barWidth = Math.floor(chart.offsetWidth/chart.data.length);

        chart.renderSvg = function(){
            this.svg = d3.select(nodeClass).append('svg')
                        .style({
                            'width': that.width,
                            'height': that.height
                        });
            return this;
        }

        chart.renderBody = function(){
            if(this.svg){
                this.bodyG = this.svg.append('g');
            }
            return this;
        }

        chart.renderAxis = function(){
            var largestPC = _this_.getLargestCount(that.data, 'pCount');
            //console.log(that.data);
            this.xScale = d3.scale.linear()
                            .domain([0, that.data.length])
                            .range([0, that.offsetWidth]);

            this.yScale = d3.scale.linear()
                            .domain([0, largestPC])
                            .range([that.offsetHeight, 0]);

            this.xAxis = d3.svg.axis()
                            .scale(that.xScale)
                            .orient('bottom');

            this.yAxis = d3.svg.axis()
                            .scale(that.yScale)
                            .orient('left')
                            .ticks(5);

            this.bodyG.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(' + that.offset + ',' + (that.offset+that.offsetHeight) + ')')
                        .call(that.xAxis);

            this.bodyG.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(' + that.offset + ',' + (that.offset) + ')')
                        .call(that.yAxis);

            return this;
        }

        chart.renderBar = function(){
            var barPadding = 4;
            this.barG = this.bodyG.selectAll('rect')
                            .data(that.data)
                            .enter()
                            .append('rect')
                            .attr('x', function(d, i){
                                return barPadding/2 + that.offset + i*Math.ceil(that.offsetWidth/that.data.length);
                            })
                            .attr('y', function(d, i){
                                return that.yScale(d.pCount);
                            })
                            .attr('width', function(){
                                return that.barWidth;
                            })
                            .attr('height', function(d, i){
                                return that.offsetHeight - that.yScale(d.pCount);
                            })
                            .attr('transform', 'translate(' + 0 + ',' + that.offset + ')')
                            .attr('class', function(d, i){
                                return 'barchart-p-' + i;
                            })
                            .on("mouseover",function(d, i){
                                d3.select(this)
                                    .style({
                                        "fill": "yellow"
                                    });
                                d3.select('text.barchart-p-'+i)
                                    .style({
                                        'display': 'block'
                                    });

                            })
                            .on("mouseout",function(d, i){
                                d3.select(this)
                                    .transition()
                                    .duration(100)
                                    .style({ 
                                        'fill': 'rgba(23, 107, 228, 0.67)' 
                                    });
                                d3.select('text.barchart-p-'+i)
                                    .style({
                                        'display': 'none'
                                    });
                            })
                            .style({
                                'fill': 'rgba(23, 107, 228, 0.67)'
                            });
            return this;
        }

        chart.renderLabel = function(){
            var labels = this.bodyG.selectAll("text.barchart-text")
                            .data(that.data)
                            .enter()
                            .append("text")
                            .attr("class","barchart-text")
                            .attr("class", function(d, i){
                                return 'barchart-p-'+i;
                            })
                            .attr("transform","translate(" + 0 + "," + 0 + ")")
                            .attr("x", function(d,i){
                                return that.barWidth*i;
                            } )
                            .attr("y",function(d){
                                return that.offset;
                            })
                            .attr("dx",function(){
                                // return (xScale.rangeBand() - rectPadding)/2;
                            })
                            .attr("dy",function(d){
                                // return 20;
                            })
                            .text(function(d){
                                return d.id+': '+d.pCount;
                            })
                            .style({
                                'display': 'none',
                                'fill': 'black'
                            });
        }

        return chart;
    }

    this.infoTreeChart = function(data, node, nodeClass){
        var chart = {
                data: data,
                node: node,
                nodeClass: nodeClass,
                width: node.width(),
                height: node.height()
            };

            chart.svg = d3.select(nodeClass).append('svg')
                        .attr('width', chart.width)
                        .attr('height', chart.height)
                        .style('padding-left', '40px');

            var tree = d3.layout.tree()
                .size([chart.width, chart.height])
                .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2); });

            var diagonal = d3.svg.diagonal()
                .projection(function(d) { return [d.y*1.3, d.x/3]; });

                var nodes = tree.nodes(chart.data);
                var links = tree.links(nodes);
                
                var link = chart.svg.selectAll(".link")
                  .data(links)
                  .enter()
                  .append("path")
                  .attr("class", "link")
                  .attr("d", diagonal);
                
                var node = chart.svg.selectAll(".node")
                  .data(nodes)
                  .enter()
                  .append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) {
                        return "translate(" + d.y*1.3 + "," + d.x/3 + ")"; 
                });
                
                node.append("circle")
                  .attr("r", 4.5);
                
                node.append("text")
                  .attr("dx", function(d) { return d.children ? -8 : 8; })
                  .attr("dy", 3)
                  .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                  .text(function(d) { return d.name; });

    } 
}])