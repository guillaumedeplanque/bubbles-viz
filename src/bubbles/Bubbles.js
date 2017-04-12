import * as d3 from 'd3'

export default class Bubbles {

    constructor() {
        this.bubbles = document.querySelector('.bubbles')
        if(typeof this.bubbles !== 'undefined' && this.bubbles !== null) {
            this.initD3(this.bubbles)
        }
    }

    initD3(container) {
        const w = container.offsetWidth
        const h = w
        const border = 100
        const nodes = []
        const sizeBubble = [0.10, 0.15, 0.20, 0.25, 0.3, 0.35]
        const images = document.querySelectorAll('.bubble-url')

        for (let i = 0; i < images.length; i++) {
            nodes.push({
                x: 0,
                y: 0,
                size: w * sizeBubble[Math.floor(Math.random() * sizeBubble.length)],
                image:images[i].dataset.url,
            });
        };
        let svgContainer = d3.select('.bubbles')
            .append('svg')
            .attr('width', w)
            .attr('height', h)
            .attr('id', 'svg-wrapper');
        let bubbles = svgContainer.selectAll('image.node')
            .data(nodes)
            .enter()
            .append('image');
        bubbles
            .attr('xlink:href', function(d) { return d.image; })
            .attr('class', 'node')
            .attr('x', function(d) { return d.x = Math.max(0, (Math.random() * (w - d.size))); })
            .attr('y', function(d) { return d.y = Math.max(0, (Math.random() * (h - d.size))); })
            .attr('width', function(d) { return d.size; })
            .attr('height', function(d) { return d.size; });
        const simulation = d3.forceSimulation(nodes)
            .force('forceY', d3.forceY().strength(position).y(h / 2 - 0.1 * h))
            .force('forceX', d3.forceX().strength(position).x(w / 2 - 0.1 * w))
            .force('repelForce', d3.forceManyBody().strength(charge))
            .force('forceCollide', d3.forceCollide().radius(radius))

        function charge(d) {
        	return - 1.8 * (Math.sqrt(Math.pow(d.size, 2.0) * 2) / 2)
        }
        function radius(d) {
        	return (d.size * 0.2)
        }
        function position(d) {
        	return Math.sqrt(d.size / (w * h))
        }
        function ticked() {
           bubbles.attr('x', function(d) { return Math.min(Math.max(0, d.x), w - d.size); })
           bubbles.attr('y', function(d) { return Math.min(Math.max(0, d.y), h - d.size); })
        }
        simulation.on('tick', ticked)

    }
}
