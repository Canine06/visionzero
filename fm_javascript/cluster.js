require([
        "dojo/ready",
        "dojo/query",
        "dojo/domReady!",
        "esri/layers/GraphicsLayer"
], function (ready, query, GraphicsLayer) {
    ready(function () {
        try {
            dojo.query(document.getElementById("clusterTest")).on("click", function () {
                var newclusterLayer = new extras.ClusterLayer();

                alert(map.navigationMode);


            });
        }
        catch (ex) {
            alert(ex);
        }
        
    });
});