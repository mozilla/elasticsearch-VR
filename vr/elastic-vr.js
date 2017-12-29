
d3.json("/info", function(error, jsondata) {
    console.log(error);
    console.log(jsondata);
    window.jsondata=jsondata;
    var scene = d3.select('a-scene');
    for (var i = 0; i < jsondata.clusterstatus.number_of_data_nodes; i++) {
        console.log("building an es node")
        scene.append('a-box')
          .classed('esserver',true)
          .attr('visible', 'true')
          .attr('position', "1 5 -10")
          .attr('height', '1')
          .attr('material', 'src: #estexture;')
          .attr('dynamic-body','mass:500;linearDamping:.9;angularDamping:.9;')
          .append('a-animation')
            .attr('attribute',"scale")
            .attr('direction',"alternate-reverse")
            .attr('dur',"5000")
            .attr('from',"1 1 1")
            .attr('to',"1.2 1.2 1.2")
            .attr('repeat',"indefinite");

    }

});