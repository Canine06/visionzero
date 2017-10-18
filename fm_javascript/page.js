/* Core JavaScript for the VisionZero Application - ITRE Copyright 2017
 * Developed by Argis Solutions, LLC - www.argissolutions.com
 * Kevin Criss & Brady Hustad
 */

//Global Variables used with persistence
var res;
var sqlString;
var enddateObject;
var threemonthdateObject;
var mobe = false;
var viewByValue;
var viewByDataValue;

//This is to make sure Points and Clusters can't be double clicked.
var flgPoints = true;

/* responsive Function
 * [[INSERT DESCRIPTION HERE]]
 */
function responsive() {
    var fm = this;

    fm.jRes;
    fm.mobile = false;
    fm.collapse = false;

    //register responsive js
    this.setResponsive = function () {
        fm.jRes = jRespond([
			{
			    label: 'phone',
			    enter: 0,
			    exit: 767
			},
            {
			    label: 'desktop',
			    enter: 768,
			    exit: 100000
			}
        ]);

        fm.jRes.addFunc({
            breakpoint: 'desktop',
            enter: function () {
                $('nav').css('top', '0px');
                $('nav').css('bottom', '');
                $('.fm_container_main').css('top', '4.8em');
                $(".fm_left_content").show();

                //TODO: Not sure this is the right place to setup sizing.  It seemed right but discuss with Kevin C.
                $("#tabs").tabs({
                    heightStyle: "fill"
                });
                var widthForTable = $(window).width() - $(".fm_right_content").width();
                $("#FeatureDataControl").css("width", widthForTable);
                $("#FeatureDataControl").css("z-index", -1);

                $(".fm_right_content").show();
                $(".fm_close.fm_hide").hide();

                fm.collapse = false;
                $(".fm_ribbon").show();
                $(".fm_ribbon").addClass("fm_ribbon_style");
                $(".fm_ribbon").removeClass("fm_overlay");
                $(".closediv").removeClass("fm_close");
                $(".fm_ribbon").removeClass("fm_handle");
                $(".fm_cluster").css("top", "165px");
                $(".fm_cluster").css("left", "405px");

                //switch to standard popups
                $("#mobileMenuFooter").hide();

                mobe = false;
                switchToDesktop();
                console.log('>>> desktop enter <<<');
                $(".fm_measure_trigger").click(function (e) {
                    e.preventDefault();
                    if (fm.collapse) {
                        fm.setActiveTab(null);
                        $(".fm_right_content").hide();
                    }
                    $(".fm_basemaps_list").hide();
                    $(".fm_search").hide();
                    $("#FeatureDataControl").toggle();
                    myFeatureTable.clearSelection();
                    myFeatureTable.refresh();
                    notLocatedFeatureTable.clearSelection();
                    notLocatedFeatureTable.refresh();
                    return false;
                });
            },
            exit: function () {
                $(".fm_close.fm_hide").show();
                fm.collapse = true;
                console.log('<<< desktop exit >>>');
            }
        });
        fm.jRes.addFunc({
            breakpoint: 'phone',
            enter: function () {
                mobe = true;
                hideZoomControl();
                $('.fm_container_main').css('top', '0px');
                fm.mobile = true;
                fm.collapse = true;
                fm.setActiveTab(null);
                $(".fm_ribbon").hide();
                $(".fm_show").hide();
                $(".fm_left_content").hide();
                $(".fm_right_content").hide();
                $(".fm_ribbon").removeClass("fm_ribbon_style");
                $(".fm_ribbon").addClass("fm_overlay");
                $(".closediv").addClass("fm_close");
                $(".fm_close").click(function () {
                    if ($(this).hasClass('fm_hide')) $(this).hide();
                    $(this).parent().hide();
                    if (fm.collapse) fm.setActiveTab(null);
                });
                $(".fm_ribbon").addClass("fm_handle");
                $(".fm_cluster").css("left", "60px");
                $(".fm_cluster").css("top", "110px");
                $("#mobileMenuFooter").show();
                $("#topContainer").css("padding", "");
                $("#topContainer").css("float", "left");
                $("#ShowMeForm").css("display", "");
                $("#ShowMeForm").css("width", "150px");
                $("#addFiltForm").css("float", "left");
                $("#FeatureDataControl").css("height", "");
                $("#FeatureDataControl").css("top", "37px");
                $("#FeatureDataControl").css("bottom", "120px");
                $("#FeatureDataControl").css("width", "100%");

                //switch to mobile popups
                switchToMobile();
                console.log('>>> phone enter <<<');

                $(".fm_measure_trigger").click(function (e) {
                    e.preventDefault();
                    loadInformationPanel();
                    return false;
                });
                $("#ModalButtonMobile").click(function () {
                    loadMobileChange();
                });
                $("#closeMobile").click(function () {
                    closeMobileChange();
                });
            },
            exit: function () {
                $('.fm_container_main').css('top', '4.8em');
                showZoomControl();
                fm.mobile = false;
                fm.collapse = false;
                $(".fm_ribbon").show();
                $(".fm_show").show();
                $(".fm_left_content").show();
                $(".fm_right_content").show();
                $(".fm_ribbon").addClass("fm_ribbon_style");
                $(".fm_ribbon").removeClass("fm_handle");
                $(".fm_ribbon").removeClass("fm_overlay");
                $("closediv").removeClass("fm_close");
                $(".fm_cluster").css("top", "150px");
                $(".fm_cluster").css("left", "80px");
                
                console.log('<<< phone exit >>>');
            }
        });
    }

    this.setBindings = function () {
        $(".fm_find_me").click(function () {
            if ($(this).hasClass('fm_on')) {
                //turn off
                $(this).removeClass('fm_on');
            }
            else {
                //turn on
                res.findMe();
                $(this).addClass('fm_on');
            }
        });
        $("#radio").buttonset();
        $("input:radio[name='radio']").click(function () {
            if ($("#radio :radio:checked + label").text() == 'Points') {
                if (!flgPoints) {
                    ViewByPoints();
                    flgPoints = true;
                }
            }
            else {
                if (flgPoints) {
                    createClusterFromViewBy();
                    flgPoints = false;
                }
            }

        });
        $("#fatalityinjury").html("Fatalities Only");
        $("#fatalityinjuryMobile").html("Fatalities Only");
        $("input:radio[name='deathinjury']").click(function () {
            var val = $("#deathinjury :radio:checked + label").text();
            switch (val) {
                case "Fatalities Only":
                    visionZero.sqlInjuries = "(Severity = 'K')";
                    break;

                case "Serious Injuries Only":
                    visionZero.sqlInjuries = "(Severity = 'A')";
                    break;

                case "Fatalities & Serious Injuries":
                    visionZero.sqlInjuries = "(Severity = 'A' or Severity = 'K')";
                    break;
            }
            $("#fatalityinjury").html(val);
            $("#fatalityinjuryMobile").html(val);
            //alert(val);

        });

        $("#postbutton").click(function () {
            postMapData();
        });

        $("#GoButton").click(function () {
            viewByValue = $("#ViewBy option:selected").text();
            viewByDataValue = $("#ViewByData option:selected").text();

            if (viewByValue == "") {
                alert("Please choose an option from the View By dropdown");
                return;
            }

            if (viewByValue == "State") {
                //If state is selected make sure visionZero.sqlView is cleared of leftovers
                visionZero.sqlView = "";
            } else {
                //If the state isn't selected, make sure a second layer of filter is selected.
                if (viewByDataValue == "") {
                    alert("Please choose an option from the Show My dropdown");
                    return;
                }
            }

            $("#thisDialog").dialog('close');
            updateCrashLayer();

            removeClusterLayer();
            if (!flgPoints) {
                $('input[type="radio"][id="radio1"]').prop("checked", true);
                $('#radio1').click();
                flgPoints = true;
            }

            $("#FeatureDataControl").css('z-index', 100);
            $("#mapTabLink").click();
            $("#FeatureDataControl").hide();

        });
        $("#PreviousSelect").val("previous3Months");
        $("#PreviousSelect").change(function () {
            var selectVal = $(this).val();

            var newBegDate;
            var mnths = 0;
            switch (selectVal) {
                case "previous3Months":
                    mnths = 3;
                    break;
                case "previous6Months":
                    mnths = 6;
                    break;
                case "previousYear":
                    mnths = 12;
                    break;
                case "previous3Years":
                    mnths = 36;
                    break;
                case "previous5Years":
                    mnths = 60;
                    break;
            }
            newBegDate = new Date(enddateObject.getFullYear(), enddateObject.getMonth(), enddateObject.getDate()),
            newBegDate.setMonth(newBegDate.getMonth() - mnths);

            if (selectVal == "") {
                $("#startdate").datepicker("setDate", "");
                $("#enddate").datepicker("setDate", "");
            }
            else {
                $("#startdate").datepicker("setDate", newBegDate);
                $("#enddate").datepicker("setDate", enddateObject);
                var frmMnth = Number(newBegDate.getMonth()) + 1;
                var t_Mnth = Number(enddateObject.getMonth()) + 1;
                $("#daterange").html(frmMnth + "/" + newBegDate.getDate() + "/" + newBegDate.getFullYear() + " to " + t_Mnth + "/" + enddateObject.getDate() + "/" + enddateObject.getFullYear());
                $("#daterangeMobile").html(frmMnth + "/" + newBegDate.getDate() + "/" + newBegDate.getFullYear() + " to " + t_Mnth + "/" + enddateObject.getDate() + "/" + enddateObject.getFullYear());
                fromDate = $('#startdate').datepicker('getDate');
                if (fromDate != "") {
                    var fDate = newBegDate;
                    var tDate = enddateObject;
                    var fMnth = Number(fDate.getMonth()) + 1;
                    var tMnth = Number(tDate.getMonth()) + 1;
                    visionZero.sqlDate = "CRASH_DATE BETWEEN '" + fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + "' AND '" + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear() + "'";
                    //visionZero.fr
                    if (crashLayer.visible) {
                        filterDataOnViewBy(visionZero.sqlDate, "Date", true);
                    }

                }
                else {
                    visionZero.sqlDate = "";
                }
            }

        });

        $("#ViewBy").change(function () {
            visionZero.sqlMain = "";
            getFieldInfo();
            refLayerVisibility = [];
            crashLayer.hide();
            visionZero.crashLayerVisible = false;
            refGraphicsLayer.clear();
            refLayerVisibility.push(-1);
            setSubLayerVisibility(refLayer, refLayerVisibility);
            var id = $(this).val();
            visionZero.id = id;

            //There was a switch statement, but reality is at this level it is either state, or non-state.
            if (id == "6") {
                zoomToNC();

                sqlString = "1=1";
                filterDataOnViewBy(sqlString, "ViewBy", false);
                //refLayerVisibility.push(dropdwnVal);  //We need to set this to the state layer once it exists.
                //setSubLayerVisibility(refLayer, refLayerVisibility);

                $("#Location").html("North Carolina");
                $("#LocationMobile").html("North Carolina");
                $("#ViewByData").prop('disabled', true);
            } else {
                $("#ViewByData").prop('disabled', false);
            }

            //var resultsHeader = document.getElementById('resultsHeader');
            //resultsHeader.innerText = "";
            document.getElementById('resultsHeader').innerText = "";
            crashTots = 0;
            totalCnt = 0;
        });
        $("#ViewByData").change(function () {
            
            var parentId = $("#ViewBy").val();

            visionZero.viewByData = parentId;

            var id;
            if ($("#ViewByData").val() === null) {
                id = "6";
            } else {
                id = $("#ViewByData").val();
            }

            var ptrId = id.indexOf("'");
            if (ptrId !== -1) {
                id = id.replace("'", "''");
            }

            visionZero.id = id;
            refLayerVisibility = [];
            switch (parentId) {
                case "6":
                    zoomToNC();
                    $("#Location").html("North Carolina");
                    $("#LocationMobile").html("North Carolina");
                    refLayerVisibility.push(6);
                    setSubLayerVisibility(refLayer, refLayerVisibility);

                    sqlString = "1=1";
                    selectReferenceObject(sqlString, 6, 'Shape_Length', true);
                    filterDataOnViewBy(sqlString, "ViewBy", false);
                    break;
                default:
                    if (id == "") {
                        filterDataOnViewBy(sqlString, "ViewBy", false);
                    }
                    else {
                        $("#Location").html(displayField + ": " + id);
                        $("#LocationMobile").html(displayField + ": " + id);
                        sqlString = displayField + " = '" + id + "'";
                        selectReferenceObject(sqlString, dropdwnVal, displayField, true);
                        refLayerVisibility.push(dropdwnVal);
                        setSubLayerVisibility(refLayer, refLayerVisibility);
                        filterDataOnViewBy(sqlString, "ViewBy", true);
                    }
                    break;
                case "1":
                    $("#Location").html("LEL Region: " + id);
                    $("#LocationMobile").html("LEL Region: " + id);
                    sqlString = "LEL_REGION=" + id;
                    selectReferenceObject(sqlString, dropdwnVal, "LEL_REGION", true);
                    refLayerVisibility.push(dropdwnVal);
                    setSubLayerVisibility(refLayer, refLayerVisibility);
                    filterDataOnViewBy(sqlString, "ViewBy", true);
                    break;
                case "0":
                    $("#Location").html("DOT Division: " + id);
                    $("#LocationMobile").html("DOT Division: " + id);
                    sqlString = "DOT_DIVISI=" + id;
                    selectReferenceObject(sqlString, dropdwnVal, "DOT_DIVISI", true);
                    refLayerVisibility.push(dropdwnVal);
                    setSubLayerVisibility(refLayer, refLayerVisibility);
                    sqlString = "DOT_DIV=" + id;
                    filterDataOnViewBy(sqlString, "ViewBy", true);
                    break;
            }
        });
        $(".fm_location_button").click(function () {
            locateAddress(false, $(".fm_location_input").val());
        });

        $(".fm_location_input").keyup(function (e) {
            locateAddress(e, this.value);
        });

        $(".fm_close").click(function () {
            if ($(this).hasClass('fm_hide')) $(this).hide();
            $(this).parent().hide();
            if (fm.collapse) fm.setActiveTab(null);
        });

        $(".fm_location_VisionZero").click(function (e) {
            e.preventDefault();
            $("#filtersDiv").hide();
            $("#datesDiv").hide();
            $("#routeDiv").hide();
            $("#locationDiv").show();
            $(".fm_basemaps_list").hide();
        });

        $(".fm_filters_VisionZero").click(function (e) {
            e.preventDefault();
            $("#filtersDiv").show();
            $("#datesDiv").hide();
            $("#routeDiv").hide();
            $("#locationDiv").hide();
            $(".fm_basemaps_list").hide();
        });

        $(".fm_dates_VisionZero").click(function (e) {
            e.preventDefault();
            $("#filtersDiv").hide();
            $("#datesDiv").show();
            $("#routeDiv").hide();
            $("#locationDiv").hide();
            $(".fm_basemaps_list").hide();
        });

        $(".fm_route_VisionZero").click(function (e) {
            e.preventDefault();
            $("#filtersDiv").hide();
            $("#datesDiv").hide();
            $("#routeDiv").show();
            $("#locationDiv").hide();
            $(".fm_basemaps_list").hide();
        });

        $(".fm_basemap_trigger").click(function (e) {
            e.preventDefault();
            if (fm.collapse) {
                fm.setActiveTab(null);
                $(".fm_right_content").hide();
            }
            $(".fm_measurement").hide();
            $(".fm_search").hide();
            $(".fm_basemaps_list").show();
            $("#filtersDiv").hide();
            $("#datesDiv").hide();
            $("#routeDiv").hide();
            $("#locationDiv").show();
            return false;
        });

        

        $(".fm_search_trigger").click(function (e) {
            e.preventDefault();
            if (fm.collapse) {
                fm.setActiveTab(null);
                $(".fm_right_content").hide();
            }
            $(".fm_measurement").hide();
            $(".fm_basemaps_list").hide();
            $(".fm_search").toggle();
            $(".fm_location_input").focus();
            $(".fm_basemaps_list").hide();
            return false;
        });

        $(".fm_basemaps_list").on('click', 'a', null, function (e) {
            e.preventDefault();
            var name = this.getAttribute('data-name');
            setBasemap(name);
            $(".fm_basemaps_list").toggle();
            fm.setActiveTab(null);
            return false;
        });

        $(".fm_share_trigger").click(function () {
            //fm.generateEmbedCode();
        });

        $(".fm_trigger").click(function (e) {
            e.preventDefault();
            fm.setActiveTab(this);
            var panel = $(this).data('panel');
            fm.showPanel(panel);
        });

        $(".fm_factor_alcohol").click(function (e) {
            $(this).toggleClass("fm_factor_alcohol_selected");
            SelectFactor("ALCOHOL_FL");
        });

        $(".fm_factor_unbelted").click(function (e) {
            $(this).toggleClass("fm_factor_unbelted_selected");
            SelectFactor("UNBELTED_F");
        });
        $(".fm_factor_speeding").click(function (e) {
            $(this).toggleClass("fm_factor_speeding_selected");
            SelectFactor("SPEED_FL");
        });
        $(".fm_factor_distracted").click(function (e) {
            $(this).toggleClass("fm_factor_distracted_selected");
            SelectFactor("DISTRACTED_FLAG");
        });
        $(".fm_factor_under21").click(function (e) {
            $(this).toggleClass("fm_factor_under21_selected");
            SelectFactor("TEEN_DRIVE");
        });
        $(".fm_factor_olderdriver").click(function (e) {
            $(this).toggleClass("fm_factor_olderdriver_selected");
            SelectFactor("OLDER_DRIV");
        });

        $(".fm_factor_bike").click(function (e) {
            $(this).toggleClass("fm_factor_bike_selected");
            SelectFactor("PEDALCYCLIST_FLAG");
        });

        $(".fm_factor_pedestrian").click(function (e) {
            $(this).toggleClass("fm_factor_pedestrian_selected");
            SelectFactor("PEDESTRIAN_FLAG");
        });

        $(".fm_factor_motorcycle").click(function (e) {
            $(this).toggleClass("fm_factor_motorcycle_selected");
            SelectFactor("MOTORCYCLE_FLAG");
        });

        $(".fm_factor_truck").click(function (e) {
            $(this).toggleClass("fm_factor_truck_selected");
            SelectFactor("CMV");
        });
        $(".fm_factor_lane").click(function (e) {
            $(this).toggleClass("fm_factor_lane_selected");
            SelectFactor("LANE_FL");
        });
       
        var aa = 0;
        $(".fm_factor_workzone").click(function (e) {
            
            
            $(this).toggleClass("fm_factor_workzone_selected");
            $(".fm_factor_intersection").removeClass("fm_factor_intersection_selected");
            $(".fm_factor_railroad").removeClass("fm_factor_railroad_selected");
            if (aa == 0) {
                $("#addfilters").html("Workzones");
                $("#addfiltersMobile").html("Workzones");
                setLocation(" AND (WORKZONE = 1)");
                aa = 1;
            }
            else {
                $("#addfiltersMobile").empty();
                $("#addfilters").empty();
                setLocation("");
                aa = 0;
            }
            bb = 0;
            cc = 0;
        });
        var bb = 0;
        $(".fm_factor_intersection").click(function (e) {
            
            
            $(this).toggleClass("fm_factor_intersection_selected");
            $(".fm_factor_workzone").removeClass("fm_factor_workzone_selected");
            $(".fm_factor_railroad").removeClass("fm_factor_railroad_selected");
            if (bb == 0) {
                $("#addfiltersMobile").html("Intersections");
                $("#addfilters").html("Intersections");
                setLocation(" AND (INTERSECTION = 1)");
                bb = 1;
            }
            else
            {
                $("#addfiltersMobile").empty();
                $("#addfilters").empty();
                setLocation("");

                bb = 0;
            }
            aa = 0;
            cc = 0;
        });
        var cc = 0;
        $(".fm_factor_railroad").click(function (e) {
            
            $(this).toggleClass("fm_factor_railroad_selected");
            $(".fm_factor_workzone").removeClass("fm_factor_workzone_selected");
            $(".fm_factor_intersection").removeClass("fm_factor_intersection_selected");
            if (cc == 0) {
                $("#addfilters").html("Railroads");
                $("#addfiltersMobile").html("Railroads");
                setLocation(" AND (RR = 1)");
                cc = 1;
            }
            else
            {
                $("#addfilters").empty();
                $("#addfiltersMobile").empty();
                setLocation("");
                cc = 0;
            }
            bb = 0;
            aa = 0;
        });

        $("#ModalButton").click(function () {
            //$("#ViewBy").val([]);
            //$("#ViewByData").val([]);
            clearMapGraphics();
            loadModal();
        });
        
        if (hasTouch()) {
            //alert('device has touch');
            console.log('device has touch');
            //$(".fm_overlay").draggable({
            //    cursor: 'move',
            //    containment: 'window',
            //    handle: '.fm_handle'
            //});
            /*
			.touch({
				animate: false,
				sticky: false,
				dragx: true,
				dragy: true,
				rotate: false,
				resort: true,
				scale: false
			}); /* */
        }
        else {
            //alert('device does not touch');
            console.log('device does not touch');
            //$(".fm_overlay").draggable({
            //    cursor: 'move',
            //    containment: 'window',
            //    handle: '.fm_handle'
            //});
        }
    }


    this.setActiveTab = function (tab) {
        //$(".fm_button").each(function () {
        //    $(this).removeClass('fm_button_active');
        //});
        //if (tab) $(tab).addClass('fm_button_active');
    }

    this.showPanel = function (panel) {
        $(".fm_right_content").show();
        if (fm.collapse) $(".fm_right_content").find(".fm_close").show();
        $(".fm_panel").hide();
        var panel = '.' + panel;
        $(panel).show();
    }

    //show map info
    this.populateMapInfo = function (item) {
        document.title = item.title;
        $(".fm_title_bar").html(item.title);
        var mc = 'Map Creator: ' + item.owner;

        $(".fm_description").html(item.description + '<p>' + mc + '</p>');
        //$(".fm_description").html(d + '<p>' + mc + '</p>');
        //$(".fm_footer_content").html(mc);
    }
    

    this.embedSetup = function () {
        console.log('styling page for embeding');
        $('header').hide();
        $('footer').hide();
        if (fm.mobile) {
            $('.fm_container_main').css('top', '0px');
        }
        else {
            $('nav').css('top', '0px');
            $('.fm_container_main').css('bottom', '0px').css('top', '4.8em');
        }
    }

    this.generateEmbedCode = function () {
        var pageUrl = window.location.href;
        //var code = "<iframe src='" + pageUrl + "' style='border:0px  none;' name='responsiveViewer' scrolling='no' frameborder='0' marginheight='0px' marginwidth='0px' height='60px' width='468px'></iframe>";

        var newcode = '<iframe src="' + pageUrl + '" frameborder="0" margin scrolling="no" style="width:100%;height:100%;" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

        $(".fm_embed_code").html(newcode);
    }

    this.showLoading = function () {
        console.log('show loading');
    }

    this.hideLoading = function () {
        console.log('hide loading');
    }

    this.findMe = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                if (map && location && location.coords) {
                    //console.log(location.coords);
                    //console.log(location.accuracy);
                    var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
                    if (location.accuracy < 10000) {
                        map.centerAndZoom(pt, 16);
                    }
                    else {
                        map.centerAndZoom(pt, 14);
                    }
                    var graphic = new esri.Graphic(pt, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));
                    //animateGraphicSymbol(graphic);
                    fm.animateMapSymbol(graphic);
                }

            }, function (error) {
                console.log(error);
                $(".fm_find_me").removeClass('fm_on');
            });
        }
    }

    this.animateMapSymbol = function (g) {
        var opacity = 1.0;
        var color = g.symbol.color;
        var type = g.geometry.type;
        var symbol = g.symbol;
        //debug(type);
        if (type == "extent") {
            symbol.outline.color.a = opacity;
            symbol.color.a = 0.0;
        }
        else {
            symbol.color.a = opacity;
        }
        map.graphics.add(g);
        //debug(g.symbol.color);

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

    this.initApp = function () {
        fm.setBindings();
        fm.generateEmbedCode();

        fm.setResponsive();
        //getBasemaps();

        //init info
        $(".fm_description").show();
        //if (!(fm.collapse)) fm.setActiveTab(".fm_details_trigger");
    }
}

// helpers
function hasTouch() {
    return false;
    //return !!('ontouchstart' in window);
    /*
	try {
		document.createEvent("TouchEvent");
		console.log('device has touch');
		return true;
	} catch (e) {
		console.log('device does not touch');
		return false;
	}
	/* */
}
// end helpers

$(document).ready(function () {
    res = new responsive();
    res.initApp();
    
});

//** function for updating from and to dates for the UI date pickers
function updateDatePickers(fromdate, todate) {
    threemonthdateObject = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate()),
    threemonthdateObject.setMonth(threemonthdateObject.getMonth() - 3);

    $("#startdate").datepicker({
        dateFormat: 'mm/dd/yy',
        maxDate: new Date(todate.getFullYear(), todate.getMonth(), todate.getDate()),
        minDate: new Date(fromdate.getFullYear(), fromdate.getMonth(), fromdate.getDate()),
        onSelect: function () {
            fromDate = $(this).datepicker('getDate');
            visionZero.toDate = $("#enddate").datepicker('getDate');

            if (visionZero.toDate != "") {
                var fDate = new Date(fromDate);
                var tDate = new Date(visionZero.toDate);
                var fMnth = Number(fDate.getMonth()) + 1;
                var tMnth = Number(tDate.getMonth()) + 1;
                visionZero.sqlDate = "CRASH_DATE BETWEEN '" + fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + "' AND '" + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear() + "'";
                $("#daterange").html(fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + " to " + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear());
                $("#daterangeMobile").html(fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + " to " + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear());
                if (crashLayer.visible) {

                    constructSQL();
                }
            }
            else {
                visionZero.sqlDate = "";
            }
        },
        onClose: function () {
            this.fixFocusIE = true;
            $("#topContainer").change().focus(); //If this is the JQuery datepicker, apparently there is a newer version that might fix this, but this seems to be cleaner. for the short term
        }
    }).keyup(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });
    $("#startdate").datepicker('setDate', threemonthdateObject);
    $("#enddate").datepicker({
        dateFormat: 'mm/dd/yy',
        maxDate: new Date(todate.getFullYear(), todate.getMonth(), todate.getDate()),
        minDate: new Date(fromdate.getFullYear(), fromdate.getMonth(), fromdate.getDate()),
        onSelect: function () {
            fromDate = $("#startdate").datepicker('getDate');
            visionZero.toDate = $(this).datepicker('getDate');
            if (fromDate != "") {
                var fDate = new Date(fromDate);
                var tDate = new Date(visionZero.toDate);
                var fMnth = Number(fDate.getMonth()) + 1;
                var tMnth = Number(tDate.getMonth()) + 1;
                visionZero.sqlDate = "CRASH_DATE BETWEEN '" + fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + "' AND '" + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear() + "'";
                $("#daterange").html(fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + " to " + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear());
                $("#daterangeMobile").html(fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + " to " + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear());
                if (crashLayer.visible) {
                    constructSQL();
                }
            }
            else {
                visionZero.sqlDate = "";
            }

        },
        onClose: function () {
            this.fixFocusIE = true;
            $("#topContainer").change().focus(); //If this is the JQuery datepicker, apparently there is a newer version that might fix this, but this seems to be cleaner. for the short term
        }
    }).keyup(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });
    $("#enddate").datepicker('setDate', todate);
    $("#startdate").datepicker("refresh");
    $("#enddate").datepicker("refresh");
    enddateObject = new Date(todate.getFullYear(), todate.getMonth() + 1, todate.getDate());

    var fromMnth = Number(threemonthdateObject.getMonth()) + 1;
    var toMnth = Number(todate.getMonth()) + 1;

    visionZero.sqlDate = "CRASH_DATE BETWEEN '" + fromMnth + "/" + threemonthdateObject.getDate() + "/" + threemonthdateObject.getFullYear() + "' AND '" + toMnth + "/" + todate.getDate() + "/" + todate.getFullYear() + "'";
    $("#daterange").html(fromMnth + "/" + threemonthdateObject.getDate() + "/" + threemonthdateObject.getFullYear() + " to " + toMnth + "/" + todate.getDate() + "/" + todate.getFullYear());
    $("#daterangeMobile").html(fromMnth + "/" + threemonthdateObject.getDate() + "/" + threemonthdateObject.getFullYear() + " to " + toMnth + "/" + todate.getDate() + "/" + todate.getFullYear());
    constructSQL();
    $("#LastAvailableData").html("Date of Last Available Data: " + enddateObject.getMonth() + "-" + enddateObject.getDate() + "-" + enddateObject.getFullYear());



}


//Jquery Function for selecting factors on Share load
function ShareSelectedFactors(factor) {
    $("." + factor).toggleClass(factor + "_selected");
}

//File Share Read Json Functionality on page load
function initShare() {
    var rdr = getUrlVars()["read"];
    if (typeof (rdr) != 'undefined') {
        var mapdata = getMapData(rdr);
        
    }
    else {
        if (mobe == false) {
            loadModal();
            
        }
        else
        {
            loadMobileModal();
        }
    }
    disableCluster();
}
function getMapData(fileid) {
    $.ajax({
        type: "GET",
        url: "json/" + fileid + ".json",
        dataType: "json",
        success: function (resp) {
            parseMapData(resp);
            console.log(resp);
        },
        error: function (resp) {
            console.log(resp);
        }
    });

}
function loadInformationPanel() {
    var wdth = $(window).width() - 10;
    var hth = 350;
    $("#mobileInfo").css("visibility", "visible").dialog(
                {
                    modal: true,
                    resizable: false,
                    width: wdth,
                    height: hth,
                    draggable: false,
                    title: "Data Information",
                    open: function (event, ui) {
                        $('.ui-widget-overlay').addClass('custom-overlay');
                        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                    },
                    close: function (event, ui) {
                        $('.ui-widget-overlay').removeClass('custom-overlay');
                        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                    }
                });
}
function loadMobileChange() {
    closeMobileChange();
    loadMobileModal();
}
function closeMobileChange() {
    $("#mobileInfo").dialog('close');
}
function loadModal() {
    var wdth = 720;
    var hth = $(window).height();
    if (hth > 900)
        hth = hth - 270;
    else
        hth = hth - 135;
    $("#thisDialog").css("visibility", "visible").dialog(
                {
                    modal: true,
                    resizable: false,
                    width: wdth,
                    height: hth,
                    draggable: false,
                    title: "Welcome to NC Vision Zero Maps!",
                    open: function (event, ui) {
                        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                    }
                });
}
function loadMobileModal() {
    var wdth = $(window).width() - 10;
    var hth = $(window).height() - 10;
    $("#thisDialog").css("visibility", "visible").dialog(
                {
                    modal: true,
                    resizable: false,
                    width: wdth,
                    height: hth,
                    draggable: false,
                    title: "Welcome to NC Vision Zero Maps!",
                    open: function (event, ui) {
                        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                    }
                });
}
function postMapData() {
    var mapData = stringifyObject(visionZero);

    $.ajax({
        url: "MapShare/Create",
        type: "POST",
        data: mapData,
        success: function (data, textstatus, jqXHR) {
            // concatenate string with 'data' response and provide URL back to UI
            var url = window.location.host + window.location.pathname;
            var wdth = 350;
            var hth = 250;
            $("#shareLink").attr("href", "mailto:?subject=Someone%20has%20shared%20a%20NC%20Vision%20Zero%20Map%20with%20you&body=I%20have%20shared%20this%20map%20with%20you.%20%20Click%20below%20to%20view%20map.%0D%0Ahttps://" + url + "?read=" + data);
            $("#shareInfo").css("visibility", "visible").dialog(
               {
                   modal: true,
                   resizable: false,
                   width: wdth,
                   height: hth,
                   draggable: false,
                   title: "Share Map",
                   open: function (event, ui) {
                       $('.ui-widget-overlay').addClass('custom-overlay');
                   },
                   close: function (event, ui) {
                       $('.ui-widget-overlay').removeClass('custom-overlay');
                   }
               });
            
            //alert("https://" + url + "?read=" + data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //  alert message for error
            alert(textStatus);
        }
    });



}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function parseMapData(mapdata) {
    if (typeof (mapdata) != 'undefined') {
        if (typeof (mapdata._mapExtentXmin) != 'undefined') {
            visionZero.mapExtentXmax = mapdata._mapExtentXmax;
            visionZero.mapExtentXmin = mapdata._mapExtentXmin;
            visionZero.mapExtentYmin = mapdata._mapExtentYmin;
            visionZero.mapExtentYmax = mapdata._mapExtentYmax;
            zoomToShareExtent();
        }
        if (typeof (mapdata._dropdwnVal) != 'undefined') {
            visionZero.dropdwnVal = mapdata._dropdwnVal;
        }
        if (typeof (mapdata._displayField) != 'undefined') {
            visionZero.displayField = mapdata._displayField;
        }
        if (typeof (mapdata._id) != 'undefined') {
            visionZero.id = mapdata._id;
        }
        
        if (typeof (mapdata._viewByData) != 'undefined') {
            visionZero.viewByData = mapdata._viewByData;
            switch (visionZero.viewByData) {
                case "0":
                    $("#Location").html("DOT Division: " + visionZero.id);
                    $("#LocationMobile").html("DOT Division: " + visionZero.id);
                    sqlString = "DOT_DIVISI=" + visionZero.id;
                    selectReferenceObject(sqlString, visionZero.dropdwnVal, "DOT_DIVISI", true);
                    refLayerVisibility.push(visionZero.dropdwnVal);
                    setSubLayerVisibility(refLayer, refLayerVisibility);
                    sqlString = "DOT_DIV=" + visionZero.id;
                    filterDataOnViewBy(sqlString, "ViewBy", true);
                    break;
                case "1":
                    $("#Location").html("LEL Region: " + visionZero.id);
                    $("#LocationMobile").html("LEL Region: " + visionZero.id);
                    sqlString = "LEL_REGION=" + visionZero.id;
                    selectReferenceObject(sqlString, visionZero.dropdwnVal, "LEL_REGION", true);
                    refLayerVisibility.push(visionZero.dropdwnVal);
                    setSubLayerVisibility(refLayer, refLayerVisibility);
                    filterDataOnViewBy(sqlString, "ViewBy", true);
                    break;
                case "6":
                    $("#Location").html("North Carolina");
                    $("#LocationMobile").html("North Carolina");
                    zoomToNC();
                    refLayerVisibility.push(6);
                    setSubLayerVisibility(refLayer, refLayerVisibility);
                    sqlString = "1=1";
                    selectReferenceObject(sqlString, 6, 'Shape_Length', true);
                    filterDataOnViewBy(sqlString, "ViewBy", false);
                    break;
                default:
                    if (visionZero.id == "") {
                        filterDataOnViewBy(sqlString, "ViewBy", false);
                    }
                    else {
                        $("#Location").html(visionZero.displayField + ": " + visionZero.id);
                        $("#LocationMobile").html(visionZero.displayField + ": " + visionZero.id);
                        sqlString = visionZero.displayField + " = '" + visionZero.id + "'";
                        selectReferenceObject(sqlString, visionZero.dropdwnVal, visionZero.displayField, true);
                        refLayerVisibility.push(visionZero.dropdwnVal);
                        setSubLayerVisibility(refLayer, refLayerVisibility);
                        filterDataOnViewBy(sqlString, "ViewBy", true);
                    }
                    break;
            }

        }
        if (typeof (mapdata._toDate) != 'undefined') {
            visionZero.toDate = mapdata.ToDate;
        }
        if (typeof (mapdata._fromDate) != 'undefined') {
            visionZero.fromDate = mapdata._fromDate;
        }
        if (typeof (mapdata._selectFactors) != 'undefined') {
            visionZero.selectFactors = mapdata._selectFactors;
        }
        if (typeof (mapdata._sqlDate) != 'undefined') {
            visionZero.sqlDate = mapdata._sqlDate;
        }
        if (typeof (mapdata._sqlView) != 'undefined') {
            visionZero.sqlView = mapdata._sqlView;
        }
        if (typeof (mapdata._sqlMain) != 'undefined') {
            visionZero.sqlMain = mapdata._sqlMain;
        }
        if (typeof (mapdata._sqlInjuries) != 'undefined') {
            visionZero.sqlInjuries = mapdata._sqlInjuries;
        }
        if (typeof (mapdata._sqlMain) != 'undefined') {
            visionZero.sqlMain = mapdata._sqlMain;
        }
        if (typeof (mapdata._sqlLocations) != 'undefined') {
            visionZero.sqlLocations = mapdata._sqlLocations;
        }
        if (typeof (mapdata._crashLayerVisible) != 'undefined') {
            if (mapdata._crashLayerVisible == true) {
                crashLayer.show();
                $("#radio").buttonset({
                    disabled: false
                });
                visionZero.crashLayerVisible = true;
            }
            else {
                crashLayer.hide();
                $("#radio").buttonset({
                    disabled: false
                });
                visionZero.crashLayerVisible = false;
            }
        }
        if (typeof (mapdata.ToDate) != 'undefined' && typeof (mapdata.FromDate) != 'undefined') {
            bindDateFromTo(mapdata);
        }
        if (typeof (mapdata._factorSqlString) != 'undefined') {
            SelectShareFactors(mapdata._factorSqlString);
        }
        

    }
}

function bindDateFromTo(mapdata) {
    var mindate = new Date(mapdata.FromDate);
    var maxdate = new Date(mapdata.ToDate);
    $("#startdate").val(mapdata.FromDate);
    $("#enddate").val(mapdata.ToDate);
    var fDate = new Date(fromDate);
    var tDate = new Date(toDate);
    var fMnth = Number(fDate.getMonth()) + 1;
    var tMnth = Number(tDate.getMonth()) + 1;
    visionZero.sqlDate = "CRASH_DATE BETWEEN '" + fMnth + "/" + fDate.getDate() + "/" + fDate.getFullYear() + "' AND '" + tMnth + "/" + tDate.getDate() + "/" + tDate.getFullYear() + "'";
    
    if (crashLayer.visible) {
        filterDataOnViewBy(visionZero.sqlDate, "Date", true);
    }
}

/*
 * A method to enable the cluster toggle buttons
 */
function enableCluster() {
    $("#radio").buttonset({
        disabled: false
    });
}

/*
 * A method to disable the cluster toggle buttons
 */
function disableCluster() {
    $("#radio").buttonset({
        disabled: true
    });
}

/*
 * A method to make the tabs for the mapped and non-mapped data tables to function without using JQuery as that
 * seemed to cause problems.  
 */
function openTable(evt, tableName, linkName) {
    var ptrTab, ptrLinks;
    var tabContent;
    var tabLinks;

    //Hide All Tabs
    tabContent = document.getElementsByClassName("tabcontent");
    for (ptrTab = 0; ptrTab < tabContent.length; ptrTab++) {
        tabContent[ptrTab].style.display = "none";
    }

    //De-activate all links
    tabLinks = document.getElementsByClassName("tablinks");
    for (ptrLinks = 0; ptrLinks < tabLinks.length; ptrLinks++) {
        tabLinks[ptrLinks].className = tabLinks[ptrLinks].className.replace(" active", "");
    }

    //Show the current tab
    var currentTab = document.getElementById(tableName);
    currentTab.style.display = "block";
    //currentTab.style.height = "100%";
    //evt.currentTarget.className += " active";
    document.getElementById(linkName).className += " active";
}