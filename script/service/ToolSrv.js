app.service('ToolSrv', [function(){
    var that = this;
    
    //数据：车辆数的统计
    this.vehicleCountPieChart = function(data, node, nodeClass){
        var chart = {
                data: data,
                node: node,
                nodeClass: nodeClass,
                width: node.width(),
                height: node.height(),
                radius: 200,
                colors: d3.scale.category20(),
                colrosb: d3.scale.category20b(),
                colrosc: d3.scale.category20c(),
                svg: null,
                bodyG: null,
                pieG: null
            };

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
            var that = this;

            var pie = d3.layout.pie()
                        .value(function(d){
                            return d.count;
                        });


            var arc = d3.svg.arc()
                        .outerRadius(that.radius)
                        .innerRadius(0);


            if(!this.pieG){
                this.pieG = this.bodyG.append('g')
                            .attr('class', 'pie')
                            .attr('transform', 'translate(250,250)');
            }

            this._renderSlices_(pie, arc);
            this._renderLabel_(pie, arc);

            return this;
        }

        chart._renderSlices_ = function(pie, arc){
            var that = this;

            var slices = this.pieG.selectAll("path.arc")
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
                        d3.select('text.piechart-'+i)
                            .style({
                                'display': 'block'
                            });

                    })
                    .on("mouseout",function(d, i){
                        d3.select(this)
                            .transition()
                            .duration(150)
                            .style("fill", function(d) { 
                                return that._colors_(i); 
                            });
                        d3.select('text.piechart-'+i)
                            .style({
                                'display': 'none'
                            });
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

        chart._renderLabel_ = function(pie, arc){
            var that = this;
            
            var labels = this.pieG.selectAll("text.label")
                    .data(pie(that.data));
            
            labels.enter()
                    .append("text")
                    .attr("class", "label")
                    .attr("class", function(d, i){
                        return 'piechart-'+i;
                    });
            
            labels.transition()
                    .attr("transform", function (d) {
                        return "translate(" 
                            + arc.centroid(d) + ")"; // <-F
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.vehicleId + ': ' + d.data.count;
                    })
                    .style({
                        'display': 'none',
                        'fill': 'black'
                    });
        }

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

    //数据：车辆载客数的统计
    this.vehiclePassengerCountBarChart = function(data, node, nodeClass){
        var chart = {
                data: data,
                node: node,
                nodeClass: nodeClass,
                width: node.width(),
                height: node.height(),
                offset: 100,
                offsetWidth: 0,
                offsetHeight: 0,
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
            //console.log(that.data);
            this.xScale = d3.scale.linear()
                            .domain(d3.range(that.data.length))
                            .range([0, that.offsetWidth]);

            this.yScale = d3.scale.pow()
                            .exponent(2)
                            .domain(d3.range(that.data.passengerCount))
                            .range([0, that.offsetHeight]);

            this.xAxis = d3.svg.axis()
                            .scale(that.xScale)
                            .orient('bottom');

            this.yAxis = d3.svg.axis()
                            .scale(that.yScale)
                            .orient('left')
                            .ticks('10');

            this.bodyG.append('g')
                        .attr('transform', 'translate(' + that.offset + ',' + (that.offset+that.offsetHeight) + ')')
                        .call(that.xAxis);

            this.bodyG.append('g')
                        .attr('transform', 'translate(' + that.offset + ',' + (that.offset) + ')')
                        .call(that.yAxis);

            return this;
        }

        chart.renderBar = function(){

        }

        return chart;
    }
}])