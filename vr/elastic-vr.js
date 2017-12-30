
d3.json("/info", function(error, jsondata) {
    console.log(error);
    console.log(jsondata);
    window.jsondata=jsondata;
    var escluster = d3.select('#escluster');
    var esnodes = Math.max(3,jsondata.clusterstatus.number_of_data_nodes)
    for (var i = 0; i < esnodes ; i++) {
        AFRAME.log("building an es node",'eslog');
        escluster.append('a-box')
          .classed('esserver',true)
          .attr('height', '1')
          .attr('material', 'src: #estexture;')
          .append('a-animation')
            .attr('attribute',"scale")
            .attr('direction',"alternate-reverse")
            .attr('dur',Math.min(5000,Math.floor(Math.random(1)*10000)))
            .attr('from',"1 1 1")
            .attr('to',"1.2 1.2 1.2")
            .attr('repeat',"indefinite");

    }

});