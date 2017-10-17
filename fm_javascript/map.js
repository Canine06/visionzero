
//dojo.registerModulePath("extras", location.pathname.replace(/\/[^/]+$/, "") + "/extras");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Measurement");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.map");
dojo.require("esri.tasks.locator");
dojo.require("esri.tasks.query");
dojo.require("esri.arcgis.utils");
dojo.require("dojo._base.array");
dojo.require("esri.dijit.PopupTemplate");
dojo.require("esri.dijit.FeatureTable");
dojo.require("esri.dijit.Print");
dojo.require("esri.symbols.SimpleMarkerSymbol");
dojo.require("esri.symbols.PictureMarkerSymbol");
dojo.require("esri.symbols.SimpleFillSymbol");
dojo.require("esri.symbols.SimpleLineSymbol");
dojo.require("esri.Color");
dojo.require("esri.renderer");

var map;
var AppConfig;
var printer = null;
var currentBasemap;
var geocoder;
var webmapResponse;
var layerWidget;
var legend;
var arrayUtils;
var refLayer;
var crashLayer;
var notLocatedLayer;
<<<<<<< HEAD
var boundariesURL = null;
var crashURL = null;
var crashURLNotLocated = null;
=======
var boundariesURL = $scope.AppConfig.MapLayers[0].url;
var crashURL = AppConfig.MapLayers[1].url;
var crashURLNotLocated = AppConfig.MapLayers[2].url;
>>>>>>> 832d8bd3ae9b8f6c3cc8a5ad57525196d13140c3
var boundariesLayerInfo = [];
var refLayerVisibility = [];
var sfs;
var refGraphicsLayer;
var crashGraphicsLayer;
var clusterLayer;
var crashTots;
var totalCnt;
var selectionSymbol;
var myFeatureTable;
var notLocatedFeatureTable;
var crashRend;
var defaultcrashSymbol;
var fromDate = "";
var toDate = "";
var sqlDate = "";
var sqlView = "";
var sqlMain = "";
var sqlInjuries = "";
var visionZero;
var factorSqlString = "(";
var g;
var sym;
var selectedLayerName;
var mapClicked;
var featureSetVision, queryVisionTask, queryVision;
var basemaps = null;

var crashFactors = null;

dojo.ready(function () {
    //clusterLayer = new extras.ClusterLayer();


});

function init() {
    var urlObject = esri.urlToObject(document.location.href);
    urlObject.query = urlObject.query || {};
    var webmap = null;
    var embed = false;

    if (urlObject.query.embed && urlObject.query.embed === 'true') res.embedSetup();
    //var name = map.name;

}
function VisionZero() {
    this._sqlMain = undefined;
    this._sqlInjuries = undefined;
    this._sqlLocations = undefined;
    this._selectFactors = undefined;
    this._toDate = undefined;
    this._fromDate = undefined;
    this._crashLayerVisible = undefined;
    this._mapExtentXmin = undefined;
    this._mapExtentXmax = undefined;
    this._mapExtentYmin = undefined;
    this._mapExtentYmax = undefined;
    this._factorSqlString = undefined;
    this._sqlView = undefined;
    this._viewByData = undefined;
    this._id = undefined;
    this._dropdwnVal = undefined;
    this._displayField = undefined;
}
function buildVzObject() {
    try {
        Object.defineProperty(VisionZero.prototype, "sqlMain", {
            set: function (val) {
                this._sqlMain = val;
                var txtFactorsSql = document.getElementById("factorTextSql");
                if (typeof (val) == "undefined") {
                    val = "";
                }

            },
            get: function () {
                return this._sqlMain;
            }
        });
        Object.defineProperty(VisionZero.prototype, "factorSqlString", {
            set: function (val) {
                this._factorSqlString = val;
            },
            get: function () {
                return this._factorSqlString;
            }
        });
        Object.defineProperty(VisionZero.prototype, "viewByData", {
            set: function (val) {
                this._viewByData = val;
            },
            get: function () {
                return this._viewByData;
            }
        });
        Object.defineProperty(VisionZero.prototype, "id", {
            set: function (val) {
                this._id = val;
            },
            get: function () {
                return this._id;
            }
        });
        Object.defineProperty(VisionZero.prototype, "dropdwnVal", {
            set: function (val) {
                this._dropdwnVal = val;
            },
            get: function () {
                return this._dropdwnVal;
            }
        });
        Object.defineProperty(VisionZero.prototype, "displayField", {
            set: function (val) {
                this._displayField = val;
            },
            get: function () {
                return this._displayField;
            }
        });
        Object.defineProperty(VisionZero.prototype, "sqlView", {
            set: function (val) {
                this._sqlView = val;
            },
            get: function () {
                return this._sqlView;
            }
        });
        Object.defineProperty(VisionZero.prototype, "sqlInjuries", {
            set: function (val) {
                this._sqlInjuries = val;
                constructSQL();
            },
            get: function () {
                return this._sqlInjuries;
            }
        });
        Object.defineProperty(VisionZero.prototype, "sqlLocations", {
            set: function (val) {
                this._sqlLocations = val;

            },
            get: function () {
                return this._sqlLocations;
            }
        });
        Object.defineProperty(VisionZero.prototype, "selectFactors", {
            set: function (val) {
                this._selectFactors = val;

            },
            get: function () {
                return this._selectFactors;
            }
        });
        Object.defineProperty(VisionZero.prototype, "toDate", {
            set: function (val) {
                this._toDate = val;

            },
            get: function () {
                return this._toDate;
            }
        });
        Object.defineProperty(VisionZero.prototype, "fromDate", {
            set: function (val) {
                this._fromDate = val;
            },
            get: function () {
                return this._fromDate;
            }
        });
        Object.defineProperty(VisionZero.prototype, "crashLayerVisible", {
            set: function (val) {
                this._crashLayerVisible = val;
            },
            get: function () {
                return this._crashLayerVisible;
            }
        });
        Object.defineProperty(VisionZero.prototype, "mapExtentXmin", {
            set: function (val) {
                this._mapExtentXmin = val;
            },
            get: function () {
                return this._mapExtentXmin;
            }
        });
        Object.defineProperty(VisionZero.prototype, "mapExtentXmax", {
            set: function (val) {
                this._mapExtentXmax = val;
            },
            get: function () {
                return this._mapExtentXmax;
            }
        });
        Object.defineProperty(VisionZero.prototype, "mapExtentYmin", {
            set: function (val) {
                this._mapExtentYmin = val;
            },
            get: function () {
                return this._mapExtentYmin;
            }
        });
        Object.defineProperty(VisionZero.prototype, "mapExtentYmax", {
            set: function (val) {
                this._mapExtentYmax = val;
            },
            get: function () {
                return this._mapExtentYmax;
            }
        });
        Object.defineProperty(VisionZero.prototype, "sqlDate", {
            set: function (val) {
                this._sqlDate = val;
            },
            get: function () {
                return this._sqlDate;
            }
        });


    }
    catch (ex) {
        alert(ex);
    }
}
function onMapLoaded() {
    
    //alert(window.location.host);
    buildVzObject();
    visionZero = new VisionZero();
    visionZero.factorSqlString = "(";
    visionZero.sqlView = "";
    visionZero.sqlDate = "";
    visionZero.sqlInjuries = "(Severity = 'K')";
    visionZero.id = "";
    visionZero.dropdwnVal = "";
    visionZero.displayField = "";
    visionZero.selectFactors = [];
    getFirstViewByContent();

    defaultcrashSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 2,
        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0, 1])));
    crashRend = new esri.renderer.SimpleRenderer(defaultcrashSymbol);
    sfs = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
        new esri.Color([255, 0, 0, 0.50]), 1.25), new esri.Color([255, 255, 0, 0.11]));
    selectionSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 14,
        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 255, 197, 1])));

    console.log('map loaded enter');

    //initialize map elements
    var scalebar = new esri.dijit.Scalebar({
        map: map,
        attachTo: "bottom-left",
        scalebarUnit: 'metric'
    });
    $(".esriScalebarLabel").each(function () {
        this.style.width = 'auto';
    });

    //add measurement tool
    var measurement = new esri.dijit.Measurement({
        map: map
    }, dojo.byId('measurementDiv'));
    measurement.startup();

    currentBasemap = new esri.layers.ArcGISTiledMapServiceLayer(getBasemapUrl(basemaps.services[2]), {
        id: 'basemap'
    });

    map.addLayer(currentBasemap);

    //add graphicsLayer
    refGraphicsLayer = new esri.layers.GraphicsLayer({
        id: "Reference Graphics Data"
    });

    map.addLayer(refGraphicsLayer);




    refLayer = new esri.layers.ArcGISDynamicMapServiceLayer(boundariesURL,
        {
            id: "Reference Data"
        });
    map.addLayer(refLayer);
    refLayerVisibility.push(-1);
    refLayer.setVisibleLayers(refLayerVisibility);
    try {
        crashLayer = new esri.layers.FeatureLayer(crashURL,
            {
                id: "Crash Data",
                outFields: ["*"],
                visible: false,
                mode: esri.layers.FeatureLayer.MODE_ONDEMAND
            });
        notLocatedLayer = new esri.layers.FeatureLayer(crashURLNotLocated,
            {
                id: "Non Mapped Crash Data",
                outFields: ["*"],
                visible: false,
                mode: esri.layers.FeatureLayer.MODE_ONDEMAND
            });
    }
    catch (ex) {
        alert(ex);
    }

    //Hook mapped totals logic into crash layer update ending event
    crashLayer.on("update-end", filterCrashes);
    mapClicked = map.on("click", executeVisionZeroQueryTask);
    crashLayer.setSelectionSymbol(selectionSymbol);
    map.addLayer(crashLayer);
    createFeatureTable();

    //populate information for map
    if (webmapResponse && webmapResponse.itemInfo && webmapResponse.itemInfo.item) {
        res.populateMapInfo(webmapResponse.itemInfo.item);
    }

    //call appropriate popup based on device type
    if (res.mobile) switchToMobile();
    else switchToDesktop();

    //get from and to dates for date picker
    getDates();
    
    map.on("extent-change", trackExtent);

    initShare();

}
//function clearFeatTable() {
//    myFeatureTable.clearSelection();
//    notLocatedFeatureTable.clearSelection();
//}
function trackExtent() {
    visionZero.mapExtentXmax = map.extent.xmax;
    visionZero.mapExtentXmin = map.extent.xmin;
    visionZero.mapExtentYmax = map.extent.ymax;
    visionZero.mapExtentYmin = map.extent.ymin;

    //alert(visionZero.mapExtentXmax + " - " + visionZero.mapExtentXmin + " - " + visionZero.mapExtentYmax + " - " + visionZero.mapExtentYmin);
}

function zoomToShareExtent() {
    var newExtent = new esri.geometry.Extent(visionZero.mapExtentXmin, visionZero.mapExtentYmin, visionZero.mapExtentXmax, visionZero.mapExtentYmax, new esri.SpatialReference({ wkid: 102100 }));
    map.setExtent(newExtent);
}

function createFeatureTable() {
    //FeatureTable
    try {
        myFeatureTable = new esri.dijit.FeatureTable({
            featureLayer: crashLayer,
            map: map,
            gridOptions: {
                allowSelectAll: false,
                allowTextSelection: true,
                pagination: true
            },
            editable: false,
            showFeatureCount: false,
            zoomToSelection: false, //Have this as false so that when selected in the table it immediately doesn't fire update-end event on the layer
            showGridHeader: true,
            showGridMenu: false,
            syncSelection: true,
            dateOptions: {
                //set date options at the feature table level 
                //all date fields will adhere this 
                datePattern: "EEEE, MMMM d, y"
            },
            //define order and visibility of fields. If the fields are not listed in 'outFIelds'
            // then they will be hidden when the table starts. 
            outFields: ["CRASH_DATE", "WEATHER", "WORKZONE", "DATE_TEXT"],
            fieldInfos: [
              {
                  name: 'CRASH_DATE',
                  alias: 'Crash Date',
              },
              {
                  name: 'WEATHER',
                  alias: 'Weather',
              },
              {
                  name: 'WORKZONE',
                  alias: "Work Zone"
              },
              {
                  name: 'DATE_TEXT',
                  alias: 'Date',
              }

            ],
        }, 'FeaturesDataTable');

        notLocatedFeatureTable = new esri.dijit.FeatureTable({
            featureLayer: notLocatedLayer,
            map: map,
            gridOptions: {
                allowSelectAll: false,
                allowTextSelection: true,
                pagination: true,
                columnHider: false,
                columnResizer: true
            },
            editable: false,
            zoomToSelection: false, //disable pan/zoom action on the map for selected features
            showGridHeader: true,
            showGridMenu: false,
            syncSelection: false,
            dateOptions: {
                //set date options at the feature table level 
                //all date fields will adhere this 
                datePattern: "EEEE, MMMM d, y"
            },
            //define order and visibility of fields. If the fields are not listed in 'outFIelds'
            // then they will be hidden when the table starts. 
            outFields: ["CRASH_DATE", "WEATHER", "WORKZONE", "DATE_TEXT"],
            fieldInfos: [
              {
                  name: 'CRASH_DATE',
                  alias: 'Crash Date',
              },
              {
                  name: 'WEATHER',
                  alias: 'Weather',
              },
              {
                  name: 'WORKZONE',
                  alias: "Work Zone"
              },
              {
                  name: 'DATE_TEXT',
                  alias: 'Date',
              }

            ],
        }, 'NonMappedDataTable');
    }
    catch (ex) {
        alert(ex);
    }

    //myFeatureTable.on("load", function () {
    //    document.getElementById("FeatureDataControl").style.display = "none";
    //});

    //notLocatedFeatureTable.on("load", function () {
    //    document.getElementById("FeatureDataControl").style.display = "none";
    //});
    myFeatureTable.startup();
    notLocatedFeatureTable.startup();
}

function onMapExtentChange() {
    var scale = Math.round(esri.geometry.getScale(map));

    if (scale > 999 && scale <= 999999) {
        scale = Math.round(scale / 1000) + " <b>K</b>";
    } else if (scale > 999999) {
        scale = Math.round(scale / 1000000) + " <b>M</b>";
    } else if (scale > 0 && scale <= 999) {
        scale = Math.round(scale) + " <b>Ft</b>";
    }

    //res.updateScaleInfo(scale, map.getLevel());
}

function getBasemaps() {
    //add request to get basemaps
    showBasemaps(basemaps.services);
}

function getBasemapUrl(service) {
    return 'https://server.arcgisonline.com/ArcGIS/rest/services/' + service.name + '/' + service.type;
}

function showBasemaps(basemaps) {
    var code = '';
    for (i = 0; i < basemaps.length; i++) {
        var basemap = basemaps[i];
        if (basemap.type === 'MapServer' && basemap.name != "World_Imagery") {
            //code += "<p class='fm_container' >";
            code += "<a href='#' data-name='" + basemap.name + "' class='fm_basemap_option' >"
					+ "<img src='images/" + basemap.image + "' class='fm_basemap_image' />"
					+ "<label>" + basemap.title + "</label>";
            + "</a>";
            //code += "</p>";
        }
    }
    $("#basemapList").html(code);
}

function setBasemap(name) {
    var imageryBasemap;
    var h;
    for (i = 0; i < basemaps.services.length; i++) {
        if (basemaps.services[i].name === name) {
            if (currentBasemap) {
                map.removeLayer(currentBasemap);
                var imgry = map.getLayer("imagery");
                var strts = map.getLayer(0);
                if (imgry) {
                    map.removeLayer(imgry);
                }
            }

            currentBasemap = new esri.layers.ArcGISTiledMapServiceLayer(getBasemapUrl(basemaps.services[i]), {
                id: 'Basemap'
            });
            
            if (name == "Reference/World_Transportation") {
                imageryBasemap = new esri.layers.ArcGISTiledMapServiceLayer(getBasemapUrl(basemaps.services[1]), { id: 'imagery' });
                currentBasemap.id = "Streets";


                map.addLayer(imageryBasemap, 0);
                map.addLayer(currentBasemap, 1);
            }
            else {
                map.addLayer(currentBasemap, 0);
            }

            return true;
        }
    }

}


var targetField;
//** Generic QueryTask for zooming to selected Reference data
function selectReferenceObject(sqlStatement, layerID, outFields, returnGeometry) {

    targetField = outFields;
    //initialize query task
    var queryTask = new esri.tasks.QueryTask(boundariesURL + layerID);
    var query = new esri.tasks.Query();

    query.returnGeometry = returnGeometry;
    query.outFields = [outFields];
    query.where = sqlStatement;
    if (returnGeometry) {
        queryTask.execute(query, loadData, onError);
    }
    else {
        queryTask.execute(query, loadAttrib, onError);
    }
}

function Hello(evt) {
    alert("hello");
}



//** error handling method
function onError(evt) {
    alert(evt);
}
//Work with spatial data for extent zoom on View By
function loadData(featureSet) {

    //if features more than zero then continue
    if (featureSet.features.length > 0) {
        refGraphicsLayer.clear();
        //create extent from first record in 
        var ext = featureSet.features[0].geometry.getExtent();
        var graphic = featureSet.features[0];
        graphic.symbol = sfs;
        refGraphicsLayer.add(graphic);

        //if feature are more than one then do this
        if (featureSet.features.length > 1) {
            //Loop through each feature returned
            for (var i = 1; i < featureSet.features.length; i++) {
                //Get the current feature from the featureSet.
                //Feature is a graphic

                var graphic = featureSet.features[i];
                var extGraphic = graphic.geometry.getExtent();
                refGraphicsLayer.add(graphic, sfs);
                //map.graphics.add(graphic);
                ext.union(extGraphic);
            }
        }



        //zoom to new extent
        map.setExtent(ext.expand(1.5));
        //map.setZoom(15);

    }
}
var referenceVals = [];
function loadAttrib(featureSet) {
    vals = [];
    referenceVals = [];
    for (var i = 0; i < featureSet.features.length; i++) {
        //Get the current feature from the featureSet.
        //Feature is a graphic

        var graphic = featureSet.features[i];
        if (graphic.attributes[targetField] != null) {
            referenceVals.push(graphic.attributes[targetField]);
        }
    }
    var secondSelect = document.getElementById("ViewByData");
    secondSelect.innerHTML = "";

    //create selected blank option
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(""));
    opt.value = "";
    secondSelect.appendChild(opt);

    var finalArray;
    //if return array is alpha then sort
    if (targetField == "County" || targetField == "MB_NAME") {
        finalArray = referenceVals.sort();
    }
    else {
        //else just pass incoming array to final array
        finalArray = referenceVals;
    }
    //add new options
    for (var a = 0; a < finalArray.length; a++) {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode(finalArray[a]));
        if (finalArray[a] != "") {
            opt.value = finalArray[a];
            secondSelect.appendChild(opt);
        }
    }

}
//** end of Generic QueryTask

//**  Generic function to set visible layers of a dynamic map service
function setSubLayerVisibility(layer, subLayerIds) {
    layer.setVisibleLayers(subLayerIds);
}

function filterDataOnViewBy(sqlstring, incomingSource, viewData) {

    switch (incomingSource) {
        case "Date":
            visionZero.sqlDate = sqlstring;
            break;
        case "ViewBy":
            visionZero.sqlView = sqlstring;
            break;
    }



}

function updateCrashLayer() {
    //Call SQL parsing method
    constructSQL();
    //set Definition for feature layer
    crashLayer.setDefinitionExpression(visionZero.sqlMain);
    crashLayer.clearSelection();
    notLocatedLayer.setDefinitionExpression(visionZero.sqlMain);
    
    //If the attribute table exist then resfresh content
    //Note:  This internal method call is a workaround from ESRI
    if (typeof (myFeatureTable) != 'undefined') {
        myFeatureTable._createStoreFromDataQuery();
    }
    if (typeof (notLocatedFeatureTable) != 'undefined') {
        notLocatedFeatureTable._createStoreFromDataQuery();
    }

    $("#ViewByData").change();

    visionZero.crashLayerVisible = true;
    crashLayer.show();
    notLocatedLayer.show();
    if (visionZero.selectFactors.length < 1) {
        enableCluster();
    }
}

//**query from and to dates of dataset
function getDates() {
    var queryTaskdate = new esri.tasks.QueryTask(AppConfig.MapLayers[3].url);

    var querydate = new esri.tasks.Query();
    querydate.outFields = ["MINDATE, MAXDATE"];
    querydate.where = "1 = 1";
    queryTaskdate.execute(querydate, getMinMaxDate, onError);
}

//create date obects and pass the date picker update function
function getMinMaxDate(featureSet) {
    var mindate = new Date(featureSet.features[0].attributes["MINDATE"]);
    var maxdate = new Date(featureSet.features[0].attributes["MAXDATE"]);
    updateDatePickers(mindate, maxdate);
}


//**Cluser logic
function createClusterFromViewBy() {
    if (typeof (sqlString) == 'undefined') {
        alert("no data is selected.");
        return;
    }
    var queryTask = new esri.tasks.QueryTask(crashLayer.url);
    var query = new esri.tasks.Query();

    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = visionZero.sqlMain;

    queryTask.execute(query, getClusterData, onError);

}

//Query crash data from sql string from View By Control
function getClusterData(featureSet) {
    var a = 0;


    if (featureSet.features.length > 0) {

        crashGraphicsLayer = new esri.layers.GraphicsLayer({
            id: "Crash Graphics Data"
        });


        //Loop through each feature returned
        for (var i = 1; i < featureSet.features.length; i++) {
            //Get the current feature from the featureSet.
            //Feature is a graphic

            var graphic = featureSet.features[i];
            crashGraphicsLayer.add(graphic);
        }

        var popupWin = buildpopupTemplate();
        var graphicsInfo = buildItems(crashGraphicsLayer);

        //= new extras.ClusterLayer();

        dojo.require("extras.ClusterLayer");
        dojo.addOnLoad(function () {
            try {
                clusterLayer = new extras.ClusterLayer({
                    "data": graphicsInfo,
                    "distance": 100,
                    "id": "clusters",
                    "labelColor": "#fff",
                    "labelOffset": 10,
                    "resolution": map.extent.getWidth() / map.width,
                    "singleColor": "#888",
                    //'singleTemplate': popupWin,
                    'useDefaultSymbol': true,
                    'objectIdField': 'OBJECTID' // define the objectid field
                });
            }
            catch (ex) {
                a = a + 1;
                if (a < 2) {
                    getClusterData(featureSet);
                }

            }

            var rend = buildRenderer();

            clusterLayer.setRenderer(rend);

            map.addLayer(clusterLayer);
            crashLayer.hide();
            notLocatedLayer.hide();
            visionZero.crashLayerVisible = false;
        });

    }

}

//If points radio button is pushed
function ViewByPoints() {
    var defExp = crashLayer.getDefinitionExpression();
    if (typeof (defExp) != 'undefined') {
        updateCrashLayer();
        visionZero.crashLayerVisible = true;
    }
    removeClusterLayer();
}



//Remove clusterlayer from map
function removeClusterLayer() {
    if (typeof (clusterLayer) != 'undefined') {
        map.removeLayer(clusterLayer);

    }
}


//Build collection for ClusterLayer
function buildItems(gl) {
    var graphicInfo = [];

    var length = crashGraphicsLayer.graphics.length - 1;

    for (var i = 1; i <= length; i++) {
        var graphic = gl.graphics[i];
        var pt = new esri.geometry.Point(graphic.geometry);
        var attributes = {
            "Crash Date": buildDate(graphic.attributes['CRASH_DATE']),
            "Crash ID": graphic.attributes['CRSH_ID'],
            "Severity": graphic.attributes['Severity'],
            "Speeding": convertIntToText(graphic.attributes['SPEED_FL']),
            "Teen Driver": convertIntToText(graphic.attributes['TEEN_DRIVE']),
            "Older Driver": convertIntToText(graphic.attributes['OLDER_DRIV']),
            "Alcohol/Drug": convertIntToText(graphic.attributes['ALCOHOL_FL']),
            "Motorcycle": convertIntToText(graphic.attributes['MOTORCYCLE_FLAG']),
            "Unbelted": convertIntToText(graphic.attributes['UNBELTED_F']),
            "Crash Type": graphic.attributes['CRASH_TYPE']
        };
        var record = { "x": pt.x, "y": pt.y, "attributes": attributes };
        graphicInfo.push(record);
    }
    return graphicInfo;
}
//parser for date string
function buildDate(date_string) {
    var dateObject = new Date(date_string);
    var mnth = dateObject.getMonth() + 1;
    var dy = dateObject.getDate();
    var yr = dateObject.getFullYear();
    return mnth + "/" + dy + "/" + yr;
}
//convert Yes/No string to bit
function convertIntToText(attr) {
    if (attr == 1) {
        return "Yes";
    }
    else {
        return "No";
    }
}
//build renderer for ClusterLayer
function buildRenderer() {
    var defaultSym = new esri.symbol.SimpleMarkerSymbol().setSize(4);
    var renderer = new esri.renderer.ClassBreaksRenderer(defaultSym, "clusterCount");

    var green = new esri.symbol.SimpleMarkerSymbol();
    green.setSize("18");
    green.setColor(new esri.Color([255, 0, 0, .5]));
    green.setOutline(null);
    green.setOffset(0, 12);

    var blue = new esri.symbol.SimpleMarkerSymbol();
    blue.setSize("30");
    blue.setColor(new esri.Color([255, 0, 0, .6]));
    blue.setOutline(null);
    blue.setOffset(0, 12);

    var purple = new esri.symbol.SimpleMarkerSymbol();
    purple.setSize("36");
    purple.setColor(new esri.Color([255, 0, 0, .7]));
    purple.setOutline(null);
    purple.setOffset(0, 12);

    var orange = new esri.symbol.SimpleMarkerSymbol();
    orange.setSize("42");
    orange.setColor(new esri.Color([255, 0, 0, .8]));
    orange.setOutline(null);
    orange.setOffset(0, 12);

    var red = new esri.symbol.SimpleMarkerSymbol();
    red.setSize("48");
    red.setColor(new esri.Color([255, 0, 0, .9]));
    red.setOutline(null);
    red.setOffset(0, 12);

    renderer.addBreak(0, 2, green);
    renderer.addBreak(3, 5, blue);
    renderer.addBreak(6, 9, purple);
    renderer.addBreak(10, 15, orange);
    renderer.addBreak(15, 1001, red);

    return renderer;
}

//build popupTemplate
function buildpopupTemplate() {
    var popupTemplate = esri.dijit.PopupTemplate({
        'title': 'Crash Info',
        'fieldInfos': [{
            'fieldName': 'DATE_TEXT',
            'label': 'Crash Date: ',
            visible: true
        }, {
            'fieldName': 'CRSH_ID',
            'label': 'Crash ID: ',
            visible: true
        }, {
            'fieldName': 'Severity',
            'label': 'Severity: ',
            visible: true
        }, {
            'fieldName': 'SPEED_FL',
            'label': 'Speeding: ',
            visible: true
        }, {
            'fieldName': 'TEEN_DRIVE',
            'label': 'Teen Driver: ',
            visible: true
        }, {
            'fieldName': 'OLDER_DRIV',
            'label': 'Older Driver: ',
            visible: true
        }, {
            'fieldName': 'ALCOHOL_FL',
            'label': 'Alcohol/Drug:',
            visible: true
        }, {
            'fieldName': 'MOTORCYCLE_FLAG',
            'label': 'Motorcycle:',
            visible: true
        }, {
            'fieldName': 'UNBELTED_F',
            'label': 'Unbelted:',
            visible: true
        }, {
            'fieldName': 'CRASH_TYPE',
            'label': 'Crash Type:',
            visible: true
        }
        ]
    });
    return popupTemplate;

}

//**Zoom to full extent of NC
function zoomToNC() {
    var secondSelect = document.getElementById("ViewByData");
    secondSelect.innerHTML = "";
    var myExtent = new esri.geometry.Extent(
                               { "xmin": -9386662, "ymin": 4007552, "xmax": -8400130, "ymax": 4381853, "spatialReference": { "wkid": 102100 } });
    map.setExtent(myExtent);

    refLayerVisibility = [];
    refLayerVisibility.push(-1);

    //Not sure we need this or not.
    refGraphicsLayer.clear();
}

//**get extent of LELRegion
function ZoomToLDefaultExtent(layerId) {
    dojo.io.script.get({
        url: boundariesURL + layerId + '?f=json',
        content: { q: "#dojo" },
        callbackParamName: "callback"
    }).then(function (data) {
        var newExtent = new esri.geometry.Extent
        newExtent.xmax = data.extent.xmax;
        newExtent.xmin = data.extent.xmin;
        newExtent.ymax = data.extent.ymax;
        newExtent.ymin = data.extent.ymin;
        map.setExtent(newExtent);
    });
}

dojo.ready(init);


//Heat Chart Logic & Mapped/Non-mapped totals logic
function filterCrashes() {
    myFeatureTable._createStoreFromDataQuery();
    notLocatedFeatureTable._createStoreFromDataQuery();

    //Since we are on version 3.16 we cannot select rows in the table until we move to 3.18 so we have to instead clear 
    //the selection as any motion in the map will run end-update and 
    //thus run this event.
    crashLayer.clearSelection();

    //This query works off of the existing layer to count the record, etc.
    var query = new esri.tasks.Query();
    query.returnGeometry = false;
    query.outFields = ["*"];
    query.where = "1=1";
    //query.where = visionZero.sqlMain;
    crashLayer.queryFeatures(query, queryCrashes, onError);
}

function queryCrashes(featureSet) {
    resetHeatGrid();
    //update totals with mapped data
    crashTots = featureSet.features.length;

    for (var i = 0; i < featureSet.features.length; i++) {
        //update heat chart with mapped data
        updateHeatChart(featureSet.features[i].attributes['DATE_TEXT']);
    }

    var queryTask = esri.tasks.QueryTask(crashURLNotLocated);
    var query = new esri.tasks.Query();
    query.returnGeometry = false;
    query.outFields = ["*"];
    query.where = crashLayer.getDefinitionExpression();
    query.geometry = null;
    queryTask.execute(query, finalTotals, onError);
}

/*
 * This method seems to do two things, one is to update the bottom footer of crashes versus mapped crashes
 * the second is to update the heat map to include those unmapped crashes
 */
function finalTotals(featureSet) {

    //update totals with non-mapped data
    totalCnt = crashTots + featureSet.features.length;
    for (var i = 0; i < featureSet.features.length; i++) {
        //update heat chart with non-mapped data
        updateHeatChart(featureSet.features[i].attributes['DATE_TEXT']);
    }

    //logic below to update crash totals
    var resultstHeader = document.getElementById('resultsHeader')
    resultstHeader.innerText = "Crashes Mapped: " + crashTots + " of " + totalCnt;
}

//** helpers ** DO NOT OVERWRITE

function updateHeatChart(inDate) {


    var date = new Date(parse(inDate));
    // big gotcha -------------------------^^^
    // month must be between 0 and 11, not 1 and 12




    var dateday = date.getDay();
    var datehour = date.getHours();


    var elementday = "";
    var elementhour = "";
    switch (dateday) {
        case 0:
            elementday = "sun";
            break;
        case 1:
            elementday = "mon";
            break;
        case 2:
            elementday = "tues";
            break;
        case 3:
            elementday = "wed";
            break;
        case 4:
            elementday = "thurs";
            break;
        case 5:
            elementday = "fri";
            break;
        case 6:
            elementday = "sat";
            break;
    }

    switch (datehour) {
        case 0:
            elementhour = "12a";
            break;
        case 1:
            elementhour = "12a";
            break;
        case 2:
            elementhour = "12a";
            break;
        case 3:
            elementhour = "12a";
            break;
        case 4:
            elementhour = "4a";
            break;
        case 5:
            elementhour = "4a";
            break;
        case 6:
            elementhour = "4a";
            break;
        case 7:
            elementhour = "4a";
            break;
        case 8:
            elementhour = "8a";
            break;
        case 9:
            elementhour = "8a";
            break;
        case 10:
            elementhour = "8a";
            break;
        case 11:
            elementhour = "8a";
            break;
        case 12:
            elementhour = "12p";
            break;
        case 13:
            elementhour = "12p";
            break;
        case 14:
            elementhour = "12p";
            break;
        case 15:
            elementhour = "12p";
            break;
        case 16:
            elementhour = "4p";
            break;
        case 17:
            elementhour = "4p";
            break;
        case 18:
            elementhour = "4p";
            break;
        case 19:
            elementhour = "4p";
            break;
        case 20:
            elementhour = "8p";
            break;
        case 21:
            elementhour = "8p";
            break;
        case 22:
            elementhour = "8p";
            break;
        case 23:
            elementhour = "8p";
            break;
    }

    var num = Number(document.getElementById(elementday + elementhour).innerHTML);
    num += 1;
    document.getElementById(elementday + elementhour).innerHTML = num;
    setBackground(num, elementday + elementhour);
    var st = "";

}
function resetHeatGrid() {
    var dayys = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
    var hrs = ["12a", "4a", "8a", "12p", "4p", "8p"];

    for (a = 0; a < dayys.length; a++) {
        for (b = 0; b < hrs.length; b++) {
            document.getElementById(dayys[a] + hrs[b]).innerHTML = "";
            document.getElementById(dayys[a] + hrs[b]).style.backgroundColor = "";
            document.getElementById(dayys[a] + hrs[b]).style.color = "";
        }
    }


}
function setBackground(num, elementName) {
    var color = "";
    var textcolor = "";
    if (num >= 0 && num <= 2) {
        color = "#6495ED";
        textcolor = "white";
    }
    else if (num >= 3 && num <= 5) {
        color = "#87CEFA";
        textcolor = "white";
    }
    else if (num >= 6 && num <= 10) {
        color = "#ADD8E6";
        textcolor = "gray";
    }
    else if (num >= 11 && num <= 15) {
        color = "#FFC0CB";
        textcolor = "gray";
    }
    else if (num >= 16 && num <= 20) {
        color = "#FF0000";
        textcolor = "gray";
    }
    else if (num >= 21 && num <= 25) {
        color = "#d22f2f";
        textcolor = "gray";
    }
    else if (num >= 26 && num <= 30) {
        color = "#a33535";
        textcolor = "gray";
    }
    else if (num >= 31 && num <= 35) {
        color = "#983131";
        textcolor = "gray";
    }
    else if (num > 36) {
        color = "#5a1f1f";
        textcolor = "gray";
    }

    document.getElementById(elementName).style.backgroundColor = color;
    document.getElementById(elementName).style.color = textcolor;

}
function switchToMobile() {
    //dojo.require("esri.dijit.Popup");
    //dojo.require("esri.dijit.PopupMobile");
    console.log('switch to mobile popup');
    require(['esri/dijit/PopupMobile'], function () {
        if (esri && dojo && map && map.loaded) {
            console.log('changing popup type to mobile');
            var popupDijit = new esri.dijit.PopupMobile(null, dojo.create("div"));
            map.setInfoWindow(popupDijit);
        }
    });
}

function switchToDesktop() {
    console.log('switch to desktop popup');
    require(['esri/dijit/Popup'], function () {
        if (esri && dojo && map && map.loaded) {
            console.log('changing popup type to desktop');
            var popupDijit = new esri.dijit.Popup(null, dojo.create("div"));
            map.setInfoWindow(popupDijit);
        }
    });
}

function showZoomControl() {
    if (!(hasTouch()) && map) map.showZoomSlider();
}
function hideZoomControl() {
    if (hasTouch() && map) map.hideZoomSlider();
}

function locateAddress(evt, addr) {
    if (evt) {
        if (evt.keyCode != dojo.keys.ENTER) {
            return;
        }
    }

    $(".fm_search").hide();
    $(".fm_location_input").val('');

    String.prototype.trim = function () {
        return this.replace(/^\s*/, "").replace(/\s*$/, "");
    };
    var address = addr.trim();

    if (!geocoder) {
        geocoder = new esri.tasks.Locator("//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
        geocoder.outSpatialReference = map.spatialReference;
    }

    if (address && address !== "") {

        geocoder.addressToLocations({
            "SingleLine": address
        }, ['*'], function (geocodeResults) {
            if (geocodeResults.length > 0) {
                var attr = geocodeResults[0].attributes;
                if (map.getLevel() < 8) {
                    map.centerAndZoom(geocodeResults[0].location, 7);
                } else
                    map.centerAt(geocodeResults[0].location);
                setTimeout(function () {
                    var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 3), new dojo.Color(0, 0, 0, 0));
                    animateGraphicSymbol(new esri.Graphic(map.extent.expand(0.8), fillSymbol));
                }, 500);
            } else {
                alert("Address not found");
            }
        }, function (err) {
            debug(dojo.toJson(err));
        });
    }
}

function animateGraphicSymbol(g) {
    var opacity = 1.0;
    var color = g.symbol.color;
    var type = g.geometry.type;
    var symbol = g.symbol;

    if (type == "extent") {
        symbol.outline.color.a = opacity;
        symbol.color.a = 0.0;
    } else {
        symbol.color.a = opacity;
    }
    map.graphics.add(g);


    var interval = setInterval(function () {
        if (type != "extent") {
            symbol.setColor(new dojo.Color([color.r, color.g, color.b, opacity]));
        }
        if (symbol.outline) {
            var ocolor = symbol.outline.color;
            symbol.outline.setColor(new dojo.Color([ocolor.r, ocolor.g, ocolor.b, opacity]));
        }
        g.setSymbol(symbol);
        if (opacity < 0.01) {
            clearInterval(interval);
            map.graphics.remove(g);
        }
        opacity -= 0.01;
    }, 20);
}
function parse(dateAsString) {
    var firstformat = dateAsString.replace(/-/g, '/');
    var indexOfformat = dateAsString.indexOf('.');
    var trimmedstring = firstformat.substring(0, indexOfformat);

    return trimmedstring;
}
function constructSQL() {
    // if only Date from to has been clicked
    if (visionZero.sqlDate != "" && visionZero.sqlView == "" && visionZero.factorSqlString == "(") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND (" + visionZero.sqlDate + ")";
    }

    //if viewby is the only tool used
    if (visionZero.sqlView != "" && visionZero.sqlDate == "" && visionZero.factorSqlString == "(") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND (" + visionZero.sqlView + ")";
    }

    //if factors are the only tool used
    if (visionZero.factorSqlString != "(" && visionZero.sqlView == "" && visionZero.sqlDate == "") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND " + visionZero.factorSqlString;
    }

    //if date and view by tool is used
    if (visionZero.factorSqlString == "(" && visionZero.sqlDate != "" && visionZero.sqlView != "") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND (" + visionZero.sqlDate + ") AND (" + visionZero.sqlView + ")";
    }

    //if factors, date and view by tool is used
    if (visionZero.factorSqlString != "(" && visionZero.sqlDate != "" && visionZero.sqlView != "") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND (" + visionZero.sqlDate + ") AND (" + visionZero.sqlView + ") AND " + visionZero.factorSqlString;
    }

    //if factors and view by tool is only used
    if (visionZero.sqlDate == "" && visionZero.sqlView != "" && visionZero.factorSqlString != "(") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND (" + visionZero.sqlView + ") AND " + visionZero.factorSqlString;
    }

    //if factors and date tool is used
    if (visionZero.sqlDate != "" && visionZero.sqlView == "" && visionZero.factorSqlString != "(") {
        visionZero.sqlMain = visionZero.sqlInjuries + " AND (" + visionZero.sqlDate + ") AND " + visionZero.factorSqlString;
    }
    if (visionZero.sqlDate == "" && visionZero.sqlView == "" && visionZero.factorSqlString == "(") {
        visionZero.sqlMain = visionZero.sqlInjuries;
    }

    if (typeof (visionZero.sqlLocations) != 'undefined') {
        if (visionZero.sqlLocations != "") {
            visionZero.sqlMain += visionZero.sqlLocations;
        }
    }

    //alert(sqlMain);

}

function getCrashFactorLayer(selectLayerName) {
    var maplyr = map.getLayer(selectLayerName);

    if (typeof (maplyr) == 'undefined') {
        var factorLayer = new esri.layers.GraphicsLayer({
            id: selectLayerName
        });

        for (var cf in crashFactors) {
            if (crashFactors[cf].layername == selectLayerName) {
                var factorSymbol = new esri.symbol.PictureMarkerSymbol(crashFactors[cf].icon, 22, 22);
                //SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([crashFactors[cf].R, crashFactors[cf].G, crashFactors[cf].B, crashFactors[cf].A])));
                var factorRenderer = new esri.renderer.SimpleRenderer(factorSymbol);
                factorLayer.setRenderer(factorRenderer);
            }
        }

        map.addLayer(factorLayer);
        //var lyrInfos = toc.layerInfos;
        var mf = map.getLayer("Multiple Factors");
        if (typeof (mf) != 'undefined') {
            //toc.layerInfos.splice(1, 0, {
            //    layer: factorLayer,
            //    title: selectLayerName,
            //    legend: true
            //});
        }
        else {
            //lyrInfos.unshift({
            //    layer: factorLayer,
            //    title: selectLayerName,
            //    legend: true
            //});
        }


        if (visionZero.selectFactors.length > 1) {
            var multiFact = map.getLayer("Multiple Factors");
            if (typeof (multiFact) == 'undefined') {
                multiFact = new esri.layers.GraphicsLayer({
                    id: "Multiple Factors"
                });
                var multiSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND, 9, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0, 1])));
                var multiRenderer = new esri.renderer.SimpleRenderer(multiSymbol);
                multiFact.setRenderer(multiRenderer);
                //lyrInfos.unshift({
                //    layer: multiFact,
                //    title: "Multiple Factors",
                //    legend: true
                //});
                map.addLayer(multiFact);
            }
            var topID = map.graphicsLayerIds.length - 1;
            map.reorderLayer(multiFact, topID);
            var secondID = topID - 1;
            map.reorderLayer(factorLayer, secondID);

        }
        //crashLayer.hide();
        disableCluster();
        visionZero.crashLayerVisible = true;
        //toc.layerInfos = lyrInfos;
        //toc.refresh();
    }
    else {
        map.removeLayer(maplyr);
        //var tocinfs = toc.layerInfos;
        if (visionZero.selectFactors.length < 2) {
            var multiFact = map.getLayer("Multiple Factors");
            if (typeof (multiFact) != 'undefined') {
                map.removeLayer(multiFact);
                //for (var ti in toc.layerInfos) {
                //    //if (toc.layerInfos[ti].title == "Multiple Factors") {
                //    //    tocinfs.splice(ti, 1);
                //    //}
                //}
            }
        }
        //for (var ti in toc.layerInfos) {
        //    if (toc.layerInfos[ti].title == selectLayerName) {
        //        tocinfs.splice(ti, 1);
        //    }
        //}
        updateCrashLayer();
        visionZero.crashLayerVisible = true;
        if (visionZero.selectFactors.length < 1) {
            enableCluster();
        }
        //toc.layerInfos = tocinfs;
        //toc.refresh();
    }
}
//** end helpers **

/* window events */
window.onorientationchange = function () {
    if (map) {
        map.resize();
    } else console.log('map not found');
}

window.onresize = function () {
    if (map) {
        map.resize();
    } else console.log('map not found');
}

//Select Factors logic
function queryCrashFeatureLayer() {
    //var inputSql = document.getElementById("factorTextSql");
    if (map.graphics != null) {
        map.graphics.clear();
    }

    //sqlString = inputSql.value;
    crashLayer.setDefinitionExpression(visionZero.sqlMain);
    notLocatedLayer.setDefinitionExpression(visionZero.sqlMain);
    //crashLayer.refresh();

    //This build the query to create the graphics for each factor that is selected.
    var query = new esri.tasks.Query();
    query.returnGeometry = true;
    query.outFields = ["ALCOHOL_FL", "CMV", "DISTRACTED_FLAG", "LANE_FL", "MOTORCYCLE_FLAG", "OLDER_DRIV", "PEDALCYCLIST_FLAG", "PEDESTRIAN_FLAG", "SPEED_FL", "TEEN_DRIVE", "UNBELTED_F"];
    query.where = visionZero.sqlMain;
    crashLayer.queryFeatures(query, queryCrashesComplete, onError);
}

/*
 * This method builds the graphics layer that displays the various graphic icons for the factors on the left bar.
 */
function queryCrashesComplete(featureSet) {
    //var infoTemplate = new esri.InfoTemplate("Crash Data for North Carolina", "Alcohol: ${ALCOHOL_FL} <br/> Unbelted: ${UNBELTED_F} <br/> Speeding: ${SPEED_FL} <br/> distracted: ${DISTRACTED_FLAG} <br/> Under 21: ${TEEN_DRIVE} <br/> 65 or older: ${OLDER_DRIV} <br/> Bicycle: ${PEDALCYCLIST_FLAG} <br/> Pedestrian:  ${PEDESTRIAN_FLAG} <br/> Motorcycle:  ${MOTORCYCLE_FLAG} <br /> Commerical Vehicle:  ${CMV} <br/> Lane Departure: ${LANE_FL}");
    for (var i = 0; i < featureSet.features.length; i++) {

        var graphic = featureSet.features[i];
        graphic.setSymbol(setUpGraphic(graphic));
        //graphic.setInfoTemplate(infoTemplate);

        var gLayer = map.getLayer(selectedLayerName);
        if (typeof (gLayer) != "undefined") {
            gLayer.add(graphic);
        }

        if (g > 1) {
            var textSymbol = new esri.symbol.TextSymbol(g).setOffset(0, -4);
            textSymbol.setColor(new esri.Color([255, 255, 255, 1]));
            var font = new esri.symbol.Font();
            font.setSize("9pt");
            font.setWeight(esri.symbol.Font.WEIGHT_BOLD);
            textSymbol.setFont(font);
            var gLayer2 = map.getLayer(selectedLayerName);
            if (typeof (gLayer2) != "undefined") {
                gLayer2.add(new esri.Graphic(graphic.geometry, textSymbol));
            }
        }
        var stubout = "";
        selectedLayerName = "";
    }
}

/*
 * This method fires whenever a factor is changed and updates the various SQL to match the factor selection.
 */
function SelectFactor(factor) {
    var ind = visionZero.selectFactors.indexOf(factor);

    if (visionZero.factorSqlString.slice(-1) == ")") {
        visionZero.factorSqlString = visionZero.factorSqlString.slice(0, -1);
    }
    if (ind == Number(-1)) {
        visionZero.selectFactors.push(factor);
        visionZero.selectFactors.sort();

        if (visionZero.selectFactors.length == 1) {
            visionZero.factorSqlString += factor + "=1";
        }
        else {
            visionZero.factorSqlString += " OR " + factor + "=1";
        }
    }
    else {
        var indexString = visionZero.factorSqlString.indexOf("(" + factor + "=1");

        if (indexString == Number(-1)) {
            visionZero.factorSqlString = visionZero.factorSqlString.replace(" OR " + factor + "=1", "");
        }
        else {
            if (visionZero.selectFactors.indexOf(factor) == 0) {
                visionZero.factorSqlString = visionZero.factorSqlString.replace(factor + "=1", "");
            }
            else {
                visionZero.factorSqlString = visionZero.factorSqlString.replace(" OR " + factor + "=1", "");
            }
            visionZero.factorSqlString = visionZero.factorSqlString.replace("( OR ", "(");
        }
        visionZero.selectFactors.splice(ind, 1);
        visionZero.selectFactors.sort();

    }
    visionZero.factorSqlString += ")";

    if (visionZero.selectFactors.length == 0) {
        visionZero.factorSqlString = "(";
    }
    var cf;
    for (cf in crashFactors) {
        if (factor == crashFactors[cf].fieldname) {
            getCrashFactorLayer(crashFactors[cf].layername);

        }
    }
    constructSQL();
    //filterCrashes();

    purgeExistingGraphicsContent();
    queryCrashFeatureLayer();

    //This code determines if the infoWindow pops up or not.  currently it seems it only comes up when you have 
    //selected a single factor.  Otherwise, nothing.
    //if (visionZero.selectFactors.length == 1) {
    //    mapClicked = map.on("click", executeVisionZeroQueryTask);
        //Listent for infoWindow onHide event
        //dojo.connect(map.infoWindow, "onHide", function () { map.graphics.clear(); });
    //}
    //if (visionZero.selectFactors.length == 0) {
    //    if (typeof (mapClicked) != 'undefined') {
    //        mapClicked.remove();
    //    }
    //}

}

function purgeExistingGraphicsContent() {
    for (var selectFact in visionZero.selectFactors) {
        for (var factor in crashFactors) {
            if (crashFactors[factor].fieldname == visionZero.selectFactors[selectFact]) {
                var gLyr = map.getLayer(crashFactors[factor].layername);
                if (typeof (gLyr) != "undefined") {
                    gLyr.clear();
                }

            }
        }
    }
    var multiFact = map.getLayer("Multiple Factors");
    if (typeof (multiFact) != 'undefined') {
        multiFact.clear();
    }

}

function setUpGraphic(graphic) {
    if (visionZero.selectFactors.length == 1) {
        if (typeof (graphic.attributes[visionZero.selectFactors[0]]) != "undefined") {
            var selectedFactor = visionZero.selectFactors[0];
            crashFactors.forEach(function (fact) {
                if (fact.fieldname == selectedFactor) {
                    sym = new esri.symbol.PictureMarkerSymbol(fact.icon, 22, 22);
                    selectedLayerName = fact.layername;
                }
            });
        }
    }
    if (visionZero.selectFactors.length > 1) {
        var a = 0;
        var attr = "";
        for (var i = 0; i < visionZero.selectFactors.length; i++) {
            if (typeof (graphic.attributes[visionZero.selectFactors[i]]) != "undefined") {
                var val = graphic.attributes[visionZero.selectFactors[i]];
                a = a + val;
                if (val == 1) {
                    attr = visionZero.selectFactors[i];
                }
            }
        }

        if (a == 1) {
            crashFactors.forEach(function (fact) {
                if (fact.fieldname == attr) {
                    sym = new esri.symbol.PictureMarkerSymbol(fact.icon, 22, 22);
                    selectedLayerName = fact.layername;
                }
            });
        }

        if (a > 1) {
            g = a;
            sym = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND, 9, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0, 1])));
            selectedLayerName = "Multiple Factors";
        }
    }

    return sym;
}

//REST call to obtain list of layers available in service
function getFirstViewByContent() {
    if (boundariesURL == "") {
        return;
    }

    var requestHandle = esri.request({
        "url": boundariesURL,
        "content": {
            "f": "json"
        },
        "callbackParamName": "callback",
    });
    requestHandle.then(requestSucceeded, requestFailed);
}

//Get display name field assigned in MXD prior to publishing

var dropdwnVal;
var displayField;
function getFieldInfo() {
    var dropdwn = document.getElementById("ViewBy");
    var dropdwnIndex = dropdwn.selectedIndex;
    dropdwnVal = dropdwn[dropdwnIndex].value;
    visionZero.dropdwnVal = dropdwnVal;
    var url = boundariesURL;
    if (url.substr(-1) == '/') {
        url += dropdwnVal;
    }
    else {
        url += "/" + dropdwnVal;
    }

    var requestHandle = esri.request({
        "url": url,
        "content": {
            "f": "json"
        },
        "callbackParamName": "callback",
    });
    requestHandle.then(requestDisplayFieldSucceeded, requestFailed);
}

function requestSucceeded(response, io) {
    var layerInfos, pad;

    pad = dojo.string.pad;

    // console.log("Succeeded: ", response);
    // dojo.toJson method converts the given JavaScript object
    // and its properties and values into simple text.
    dojo.toJsonIndentStr = "  ";
    // console.log("response as text:\n", dojo.toJson(response, true));
    //dojo.byId("ViewBy").innerHTML = "";

    // show layer indexes and names
    if (response.hasOwnProperty("layers")) {
        console.log("got some layers");
        var dropdwn = document.getElementById("ViewBy");
        layerInfos = dojo.map(response.layers, function (f) {
            var option = document.createElement("option");
            option.text = f.name;
            option.value = f.id;
            dropdwn.add(option);
            //return "<option " + "value='" + f.id + "'>" + f.name + "</option>";
        });

        //for (lyr in layerInfos) {

        //    dropdwn.innerHTML += layerInfos[lyr];
        //}

    }
}
function requestDisplayFieldSucceeded(response, io) {
    var layerInfo, pad;

    pad = dojo.string.pad;

    // console.log("Succeeded: ", response);
    // dojo.toJson method converts the given JavaScript object
    // and its properties and values into simple text.
    dojo.toJsonIndentStr = "  ";
    // console.log("response as text:\n", dojo.toJson(response, true));
    //dojo.byId("status").innerHTML = "";

    // show layer indexes and names
    if (response.hasOwnProperty("displayField")) {

        //alert(response.displayField);
        displayField = response.displayField;
        visionZero.displayField = displayField;
        selectReferenceObject("1=1", dropdwnVal, displayField, false);
        //console.log("got some layers");
        //var dropdwn = document.getElementById("content");
        //layerInfo = dojo.map(response.layers, function (f) {



        //    return "<option " + "value='" + f.id + "'>" + f.name + "</option>";
        //});

        //for (lyr in layerInfo) {
        //    dropdwn.innerHTML += layerInfo[lyr];
        //}

    }
}
function requestFailed(error, io) {
    alert(error);

}
function setLocation(sql) {
    visionZero.sqlLocations = sql;
    if (visionZero.sqlMain != "") {
        constructSQL();
        crashLayer.setDefinitionExpression(visionZero.sqlMain);
        crashLayer.clearSelection();
        notLocatedLayer.setDefinitionExpression(visionZero.sqlMain);

        myFeatureTable._createStoreFromDataQuery();
        notLocatedFeatureTable._createStoreFromDataQuery();
    }
}

function executeVisionZeroQueryTask(evt) {
    //build query task
    queryVisionTask = new esri.tasks.QueryTask(crashURL);
    //build query filter
    queryVision = new esri.tasks.Query();
    queryVision.outSpatialReference = { "wkid": 102100 };
    queryVision.returnGeometry = true;
    queryVision.outFields = ["*"];
    queryVision.where = visionZero.sqlMain;

    map.infoWindow.hide();
    map.graphics.clear();
    featureSetVision = null;

    //onClick event returns the evt point where the user clicked on the map.
    //This is contains the mapPoint (esri.geometry.point) and the screenPoint (pixel xy where the user clicked).
    //set query geometry = to evt.mapPoint Geometry
    //var windowfactor = 260;
    var windowfactor = 960;

    var xmin = evt.mapPoint.x - windowfactor;
    var xmax = evt.mapPoint.x + windowfactor;
    var ymin = evt.mapPoint.y - windowfactor;
    var ymax = evt.mapPoint.y + windowfactor;


    var ext = new esri.geometry.Extent(xmin, ymin, xmax, ymax, new esri.SpatialReference({ wkid: 102100 }));

    queryVision.geometry = ext;

    //Select everything under here as well
    crashLayer.selectFeatures(queryVision, esri.layers.FeatureLayer.SELECTION_NEW);

    //Execute task and call showResults on completion
    queryVisionTask.execute(queryVision, function (fset) {
        if (fset.features.length === 1) {
            showFeature(fset.features[0], evt);
        } else if (fset.features.length !== 0) {
            showFeatureSet(fset, evt);
        }
        else {
            map.infoWindow.hide();
            map.graphics.clear();
        }
    });
}


function showFeature(feature, evt) {
    //map.graphics.clear();

    //set symbol
    var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 14, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 255, 197, 1])));
    //new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.5]));
    feature.setSymbol(symbol);

    //construct infowindow title and content
    var attr = feature.attributes;

    var rowData = myFeatureTable.getRowDataById(attr.OBJECTID);
    //myFeatureTable.selectRows(attr.OBJECTID, true);
    //myFeatureTable.selectRows([5, 6, 7], true);

    var title = "Vision Zero Selection";
    var content = "<span style='font-weight:bold;'>Crash ID:</span> " + attr.CRSH_ID;

    if (attr.Severity != null && typeof (attr.Severity) != 'undefined') {
        content += "<br /><span style='font-weight:bold;'>Severity:</span> " + attr.Severity;
    }
    else {
        content += "<br /><span style='font-weight:bold;'>Severity:</span> Unknown";
    }

    content += "<br /><span style='font-weight:bold;'>Crash Date:</span> " + buildDate(attr.CRASH_DATE)
                + "<br /><span style='font-weight:bold;'>Crash Type:</span> " + attr.CRASH_TYPE
                + "<p><span style='font-weight:bold;'>Driver Factors:</span>";
    if (attr.ALCOHOL_FL == 1) {
        content += " Alcohol";
    }
    if (attr.UNBELTED_F == 1) {
        content += " Unbelted";
    }
    if (attr.SPEED_FL == 1) {
        content += " Speeding";
    }
    if (attr.DISTRACTED_FLAG == 1) {
        content += " Distracted";
    }
    if (attr.LANE_FL == 1) {
        content += " Lane Departure";
    }

    content += "</p>";

    content += "<p><span style='font-weight:bold;'>Driver Age Groups:</span>";

    if (attr.TEEN_DRIVE == 1) {
        content += " Under 21";
    }

    if (attr.OLDER_DRIV == 1) {
        content += " 65 or older"
    }

    content += "</p>";

    content += "<p><span style='font-weight:bold;'>Vehicles:</span>";

    if (attr.PEDALCYCLIST_FLAG == 1) {
        content += " Bicycle";
    }

    if (attr.PEDESTRIAN_FLAG == 1) {
        content += " Pedestrian";
    }

    if (attr.MOTORCYCLE_FLAG == 1) {
        content += " Motorcycle";
    }

    if (attr.CMV == 1) {
        content += " Commercial Vehicle";
    }

    if (attr.LOCAL_USE != null) {
        content += "<br /><span style='font-weight:bold;'>NCDPS Crash Report:</span> <a href='https://www.coverlab.org/ncdpsreportsearch.html?name=" + attr.LOCAL_USE + "' target='_blank'>Open...</a>";
    }
    map.graphics.add(feature);

    map.infoWindow.setTitle(title);
    map.infoWindow.setContent(content);

    (evt) ? map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint)) : null;
}

function showFeatureSet(fset, evt) {
    //remove all graphics on the maps graphics layer
    //map.graphics.clear();
    var screenPoint = evt.screenPoint;

    featureSetVision = fset;

    var numFeatures = featureSetVision.features.length;

    //QueryTask returns a featureSet.  Loop through features in the featureSet and add them to the infowindow.
    var title = "You have selected " + numFeatures + " fields.";
    var content = "Please select desired field from the list below.<br />";

    for (var i = 0; i < numFeatures; i++) {
        var graphic = featureSetVision.features[i];
        content = content + graphic.attributes.CRSH_ID + " Field (<A href='#' onclick='showFeature(featureSetVision.features[" + i + "]);'>show</A>)<br/>";
    }

    map.infoWindow.setTitle(title);
    map.infoWindow.setContent(content);
    map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
}

function SelectShareFactors(sqlFactors) {
    visionZero.factorSqlString = sqlFactors;

    var cf;
    for (cf in crashFactors) {
        for (scf in visionZero.selectFactors) {
            if (visionZero.selectFactors[scf] == crashFactors[cf].fieldname) {
                getCrashFactorLayer(crashFactors[cf].layername);
                ShareSelectedFactors(crashFactors[cf].css_class);
            }
        }

    }
    constructSQL();
    
    purgeExistingGraphicsContent();
    queryCrashFeatureLayer();

    //if (visionZero.selectFactors.length == 1) {
    //    mapClicked = map.on("click", executeVisionZeroQueryTask);
    //    //Listent for infoWindow onHide event
    //    dojo.connect(map.infoWindow, "onHide", function () { map.graphics.clear(); });
    //}
    //if (visionZero.selectFactors.length == 0) {
    //    if (typeof (mapClicked) != 'undefined') {
    //        mapClicked.remove();
    //    }
    //}

}

function clearMapGraphics() {
    map.graphics.clear();
    var refLyr = map.getLayer("Reference Graphics Data");
    refLyr.clear();

    for (var fact in visionZero.selectFactors) {
        for (var cf in crashFactors) {
            if (visionZero.selectFactors[fact] == crashFactors[cf].fieldname) {
                var lr = map.getLayer(crashFactors[cf].layername);
                map.removeLayer(lr);
            }
        }

    }
    visionZero.selectFactors = [];
    visionZero.factorSqlString = "(";
    //visionZero.sqlView = "";
    //visionZero.sqlDate = "";
    //visionZero.sqlInjuries = "(Severity = 'K')";
    constructSQL();
    crashLayer.hide();
    notLocatedLayer.hide();
    disableCluster();
    //crashLayer.setDefinitionExpression("");
    //crashLayer.refresh();
    crashLayer.clearSelection();
    refGraphicsLayer.clear();
    refLayerVisibility = [];
    refLayerVisibility.push(-1);
    setSubLayerVisibility(refLayer, refLayerVisibility);

    //var myExtent = new esri.geometry.Extent({ "xmin": -9386662, "ymin": 4007552, "xmax": -8400130, "ymax": 4381853, "spatialReference": { "wkid": 102100 } });
    //map.setExtent(myExtent);

}

function stringifyObject(obj) {
    return JSON.stringify(obj);
}

function hideZoomSlider() {
    dojo.connect(map, "onLoad", function () {
        map.hideZoomSlider();
    });

}

function showZoomSlider() {
    dojo.connect(map, "onLoad", function () {
        map.showZoomSlider();
    });

}

