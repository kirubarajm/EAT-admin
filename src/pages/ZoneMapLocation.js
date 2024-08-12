import React from "react";
import Map from "../components/Map";
import {
  MOVEIT_CURRENT_LOCATION,
  MOVEIT_CURRENT_LOCATION_CLEAR,
  LIVE_GET_MAKEIT,
  MAKEIT_GET_HUB,
  MAKEIT_LOCATION_CLEAR,
  GET_UNASSIGN_ZONE,
  ZONE_UPDATE_CLEAR,
  UPDATE_ZONE_BOUNDARIES,
  DELETE_ZONE_BOUNDARIES,
  GET_ALL_ZONE_FOR_DRAWING
} from "../constants/actionTypes";
import { Field, reduxForm } from "redux-form";
import AxiosRequest from "../AxiosRequest";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import SearchInput from "../components/SearchInput";
import { notify } from "react-notify-toast";
import SwitchButtonCommon from "../components/SwitchButtonCommon";
import { history } from "../store";
import { required } from "../utils/Validation";
import { ZONE_UPDATE } from "../utils/constant";
var jsts = require('jsts');
const renderSelect = ({
  input,
  label,
  type,
  meta: { touched, error },
  children
}) => (
  <div>
    <label>
      {label} <span className="must">*</span>
    </label>
    <div>
      <select {...input}>{children}</select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const mapStateToProps = state => ({
  ...state.moveitmaplocation,
  makeithub: state.common.makeithub,
  hub_radius: state.common.hub_radius
});

const mapDispatchToProps = dispatch => ({
  getAllMoveit: () =>
    dispatch({
      type: MOVEIT_CURRENT_LOCATION,
      payload: AxiosRequest.Moveit.getMoveitCurrentLocation()
    }),
  onGetRestaurants: data =>
    dispatch({
      type: LIVE_GET_MAKEIT,
      payload: AxiosRequest.Liveproducts.getAllRestaurants(data)
    }),
  onGetZone: data =>
    dispatch({
      type: GET_ALL_ZONE_FOR_DRAWING,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),
  onGetUnAssignZone: data =>
    dispatch({
      type: GET_UNASSIGN_ZONE,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),
  onUpdateZoneBoundaries: data =>
    dispatch({
      type: UPDATE_ZONE_BOUNDARIES,
      payload: AxiosRequest.Zone.updateZoneBoundaries(data)
    }),
  onDeleteZoneBoundaries: data =>
    dispatch({
      type: DELETE_ZONE_BOUNDARIES,
      payload: AxiosRequest.Zone.updateZoneBoundaries(data)
    }),
  onUpdateZoneClear: () => dispatch({ type: ZONE_UPDATE_CLEAR }),
  onGetMovieitHub: () =>
    dispatch({
      type: MAKEIT_GET_HUB,
      payload: AxiosRequest.Master.getMovieitHub()
    }),
  clearMap: () => dispatch({ type: MOVEIT_CURRENT_LOCATION_CLEAR }),
  clearMakeitMap: () => dispatch({ type: MAKEIT_LOCATION_CLEAR })
});
var vMap;
var markersArray = [];
var markersArrayforMakeit = [];
var markersArrayforHUb = [];
var markersArrayforZone = [];
let myColor = { background: "#314911", text: "#ffffff" };
var infowindow;
var radius = 1;
var makeitCircle;
var selectedShape;
var polygons = [];
var ZoneBasedPolygons = [];
var isZoneMap;
var all_overlays = [];
class ZoneMapLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      Move_it_viewed: false,
      Make_it_viewed: false,
      Make_it_checked: false,
      isShape_Change: false,
      isHubViewed: false,
      isPolygonViewed: false,
      zoneModal: false,
      zoneDeletedModal: false,
      zoneUpdateModal: false,
      selectedBoundaries: "",
      selectedZoneName: "",
      selectedZoneId: 0,
      clicklat: 0,
      clicklon: 0
    };
    isZoneMap = this;
  }
  componentWillUnmount(){
    if(markersArrayforHUb&&markersArrayforHUb.length>0){
      for(var i in markersArrayforHUb) {
        markersArrayforHUb[i].setMap(null);
        console.log("i--->delete",i);
      }
      markersArrayforHUb=[];
    }

    if(markersArrayforZone&&markersArrayforZone.length>0){
      for(var i in markersArrayforZone) {
        markersArrayforZone[i].setMap(null);
      }
    }

    this.onZonePolygonDelete();

  }
  componentWillMount() {
    this.addMarker = this.addMarker.bind();
    this.addLocationMoveit = this.addLocationMoveit.bind();
    this.addLocationMakeit = this.addLocationMakeit.bind();
    this.onDrawCircleBasedHub = this.onDrawCircleBasedHub.bind();
    this.refreshALL = this.refreshALL.bind();
    this.onSearch = this.onSearch.bind();
    this.onLoadLocationApi = this.onLoadLocationApi.bind();
    this.onLoadMakeitLocationApi = this.onLoadMakeitLocationApi.bind();
    this.handleSwitchChange = this.handleSwitchChange.bind();
    this.onCustomDrawShape = this.onCustomDrawShape.bind();
    this.pointInPolygon = this.pointInPolygon.bind();
    this.onLoadZoneData = this.onLoadZoneData.bind();
    this.onDrawZoneArea = this.onDrawZoneArea.bind();
    this.setSelection = this.setSelection.bind();
    this.clearSelection = this.clearSelection.bind();
    this.deleteSelectedShape = this.deleteSelectedShape.bind();
    this.zoneConfirm = this.zoneConfirm.bind();
    this.toggleZonePopup = this.toggleZonePopup.bind();
    this.toggleZoneDeletePopup = this.toggleZoneDeletePopup.bind();
    this.toggleZoneUpdatePopup = this.toggleZoneUpdatePopup.bind();
    this.onZonePolygonDelete = this.onZonePolygonDelete.bind();
    this.onDrawPolygon = this.onDrawPolygon.bind();
    this.onConfirmtoDelete = this.onConfirmtoDelete.bind();
    this.onConfirmtoUpdate = this.onConfirmtoUpdate.bind();
    this.checkStoredZone = this.checkStoredZone.bind();
    this.onUpdateCancel = this.onUpdateCancel.bind();
    this.calcIntersection=this.calcIntersection.bind();
    this.createJstsPolygon=this.createJstsPolygon.bind();
    if (!this.props.hub_radius) radius = this.props.hub_radius || 1;
  }
  onLoadZoneData = () => {
    this.props.onGetZone({ boundaries: 1 });
    this.props.onGetUnAssignZone({ boundaries: 0 });
  };
  onLoadLocationApi = () => {
    if (!this.props.makeithub || this.props.makeithub.length === 0)
      this.props.onGetMovieitHub();
  };
  onLoadMakeitLocationApi = () => {
    var filter = {
      virtualkey: "all",
      appointment_status:3,
      ka_status:2,
      search: ""
    };
    this.props.onGetRestaurants(filter);
  };
  zoneConfirm = value => {
    var data = {
      id: value.zoneid,
      boundaries: this.state.selectedBoundaries
    };
    this.props.onUpdateZoneBoundaries(data);
  };
  toggleZonePopup = () => {
    console.log("this.props.un_zone_data-->", this.props.un_zone_data);
    this.setState(prevState => ({
      zoneModal: !prevState.zoneModal
    }));
  };
  toggleZoneDeletePopup = () => {
    this.setState(prevState => ({
      zoneDeletedModal: !prevState.zoneDeletedModal
    }));
  };
  toggleZoneUpdatePopup = () => {
    this.setState(prevState => ({
      zoneUpdateModal: !prevState.zoneUpdateModal
    }));
  };

  componentDidUpdate(nextProps, nextState) {
    if (this.props.update_zone) {
      this.setState({ zoneModal: false });
      this.props.onUpdateZoneClear();
      this.deleteSelectedShape();
      this.onUpdateCancel();
      this.onZonePolygonDelete();
      this.onLoadZoneData();
      this.setState({ isPolygonViewed: false });
    }

    if (this.props.delete_zone) {
      this.setState({
        selectedZoneId: 0,
        zoneDeletedModal: false
      });
      this.props.onUpdateZoneClear();
      this.deleteSelectedShape();
      this.onZonePolygonDelete();
      this.onLoadZoneData();
      this.setState({ isPolygonViewed: false });
      selectedShape = null;
    }
  }
  refreshALL = () => {
    if (vMap) this.DeleteMarkers();
    this.props.clearMap();
    this.setState({ Move_it_viewed: false });
    this.props.getAllMoveit();
    this.onLoadLocationApi();
    this.onZonePolygonDelete();
    this.onLoadZoneData();
    this.setState({ isPolygonViewed: false });
    if(this.state.Make_it_checked) {
      this.DeleteMakeitMarkers();
      this.onLoadMakeitLocationApi();
    }
    this.setState({ Make_it_viewed: false });
  };
  onSearch = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      var moveit_array = this.props.moveit_data || [];
      if (moveit_array.length > 0 && markersArray.length > 0) {
        var isSearch = false;
        for (var i = 0; i < markersArray.length; i++) {
          if (markersArray[i].title === e.target.value && !isSearch) {
            isSearch = true;
            if (vMap) {
              vMap.setCenter(markersArray[i].getPosition());
              if (infowindow) infowindow.close();
              infowindow.setContent(this.getInfoWindowContent(moveit_array[i]));
              infowindow.open(vMap, markersArray[i]);
            }
            break;
            // this marker's title equals your search phrase
          }
        }
        if (!isSearch) {
          notify.show("Sorry! No data found", "custom", 3000, myColor);
        }
      } else {
        notify.show("Sorry! No move-it found", "custom", 3000, myColor);
      }
    }
  };
  addLocationMoveit = e => {
    console.log("this.state.Move_it_viewed-->",this.state.Move_it_viewed);
    if (this.state.Move_it_viewed || !vMap) return;
    var bounds = new window.google.maps.LatLngBounds();
    infowindow = new window.google.maps.InfoWindow();
    this.props.moveit_data.map(function(item, i) {
      if (item.location) {
        var contentString =
          "<div class='iw-ID'> #" +
          item.userid +
          "<div><div class='iw-name'>" +
          item.name +
          "<div><div class='iw-phoneno'>" +
          item.phoneno +
          "<div>";
        var latlng = { lat: item.location[0], lng: item.location[1] };
        var marker = new window.google.maps.Marker({
          position: latlng,
          map: vMap,
          title: "" + item.userid
        });
        marker.setIcon({
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 5,
          fillColor: item.color,
          fillOpacity: 0.8,
          strokeWeight: 1
        });
        markersArray.push(marker);
        bounds.extend(marker.getPosition());
        //"<div class='iw-ID'> #" + item.userid + "<div><div class='iw-name'>" + item.name + "<div><div class='iw-phoneno'>" + item.phoneno + "<div>";
        window.google.maps.event.addListener(
          marker,
          "click",
          (function(marker, i) {
            return function() {
              infowindow.setContent(contentString);
              infowindow.open(vMap, marker);
            };
          })(marker, i)
        );
      }
      //vMap.setCenter(latlng);
    });
    if(vMap && bounds) vMap.fitBounds(bounds);
    this.setState({ Move_it_viewed: true });
  };
  addLocationMakeit = pointInPolygon => {
    if (this.state.Make_it_viewed || !vMap) return;
    if (this.state.Make_it_checked) {
      var bounds = new window.google.maps.LatLngBounds();
      infowindow = new window.google.maps.InfoWindow();
      this.props.makeit_data.map(function(item, i) {
        if (item.lat && item.lon) {
          var contentString =
            "<div class='iw-ID'> #" +
            item.userid +
            "<div><div class='iw-name'>" +
            item.brandname +
            "<div><div class='iw-phoneno'>" +
            item.phoneno +
            "<div>";
          var latlng = { lat: item.lat, lng: item.lon };
          var marker = new window.google.maps.Marker({
            position: latlng,
            map: vMap,
            title: "" + item.userid
          });
          marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#026e23",
            fillOpacity: 0.5,
            strokeWeight: 1
          });
          markersArrayforMakeit.push(marker);
          bounds.extend(marker.getPosition());
          //"<div class='iw-ID'> #" + item.userid + "<div><div class='iw-name'>" + item.name + "<div><div class='iw-phoneno'>" + item.phoneno + "<div>";
          window.google.maps.event.addListener(
            marker,
            "click",
            (function(marker, i) {
              return function() {
                var sunCircle = {
                  strokeColor: "#026e23",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#026e23",
                  fillOpacity: 0.05,
                  map: vMap,
                  center: marker.getPosition(),
                  radius: radius * 1000 // in meters -->1000 meters to 1 kilometre
                };
                if (makeitCircle) makeitCircle.setMap(null);
                makeitCircle = new window.google.maps.Circle(sunCircle);
                makeitCircle.bindTo("center", marker, "position");

                infowindow.setContent(contentString);
                infowindow.open(vMap, marker);
              };
            })(marker, i)
          );
        }
        // polygons.map(function(zone, i) {
        //   if (pointInPolygon(zone, latlng)) {
        //     marker.setIcon({
        //       path: window.google.maps.SymbolPath.CIRCLE,
        //       scale: 10,
        //       fillColor: "#260bd6",
        //       fillOpacity: 0.5,
        //       strokeWeight: 1
        //     });
        //   } else {
        //     // infoPanel.hide();
        //   }
        // });
        //vMap.setCenter(latlng);
      });
      vMap.fitBounds(bounds);
      this.setState({ Make_it_viewed: true });
    }
  };
  pointInPolygon = (polygonPath, coordinates) => {
    polygonPath = JSON.parse(polygonPath.boundaries);
    console.log("polygonPath-->", polygonPath);
    let { lat, lng } = coordinates;

    let x = lat,
      y = lng;
    console.log("x,y-->", x + "," + y);
    let inside = false;
    for (
      var i = 0, j = polygonPath.length - 1;
      i < polygonPath.length;
      j = i++
    ) {
      console.log(" polygonPath[i].lat-->", polygonPath[i].lat);
      let xi = polygonPath[i].lat,
        yi = polygonPath[i].lng;
      let xj = polygonPath[j].lat,
        yj = polygonPath[j].lng;

      let intersect =
        (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };
  onCustomDrawShape() {
    if (!vMap) return;
    var polyOptions = {
      strokeWeight: 0,
      fillOpacity: 0.45,
      editable: true,
      zIndex: 1
    };
    var drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.polygon,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
      },
      markerOptions: {
        draggable: true
      },
      polygonOptions: polyOptions,
      polylineOptions: {
        editable: true
      }
    });
    drawingManager.set("drawingMode");
    window.google.maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      function(e) {
        //debugger;
      }
    );

    //delete shape
    window.google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      function(e) {
        if (e.type !== window.google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          drawingManager.setDrawingMode(null);
          if(e.overlay.getPath().getLength() < 3){
            alert("Not enought vertices. Draw a polygon that contains at least  3 vertices.");
            e.overlay.setMap(null);
            isZoneMap.setState({
              selectedBoundaries: false
            });
            return;
         }else if(!isZoneMap.calcIntersection(e.overlay, all_overlays)) {
            alert("Sorry drawn area interaction with other zone. so please redraw the area.");
            e.overlay.setMap(null);
            isZoneMap.clearSelection();
            isZoneMap.setState({
              selectedBoundaries: false
            });
            return;
          }
          all_overlays.push(e.overlay);

          var boundsForZone = [];
          var latlngArray = [];
          console.log(e.overlay.getPath());
          //boundsForZone.extend(line.getPath().getArray());
          e.overlay.getPath()
            .getArray()
            .map(function(item, i) {
              var latlng = { lat: item.lat(), lng: item.lng() };
              latlngArray.push(latlng);
              boundsForZone.push(
                new window.google.maps.LatLng(item.lat(), item.lng())
              );
            });
          isZoneMap.setState({
            selectedBoundaries: latlngArray
          });
          console.log(boundsForZone);
          polygons.push(boundsForZone);


          // Add an event listener that selects the newly-drawn shape when the user
          // mouses down on it.
          var newShape = e.overlay;
          newShape.type = e.type;
          window.google.maps.event.addListener(newShape, "click", function() {
            isZoneMap.setSelection(newShape);
          });
          isZoneMap.setSelection(newShape);
          isZoneMap.toggleZonePopup();
        }
      }
    );

    // Clear the current selection when the drawing mode is changed, or when the
    // map is clicked.
    //google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    //google.maps.event.addListener(map, 'click', clearSelection);

    // var currentBounds = myMap.getBounds();
    // var isInSight = currentBounds.contains(myPointLatLng);
    // if(isInSight){
    //     //Your point is within the current bounds
    // }
    drawingManager.setMap(vMap);
  }
  setSelection = shape => {
    console.log(
      "selection  bound-->",
      JSON.stringify(shape.getPath().getArray())
    );
    this.clearSelection();
    selectedShape = shape;
    shape.setEditable(true);
    this.setState({
      selectedBoundaries: shape.getPath().getArray()
    });
    ZoneBasedPolygons.map(function(item, i) {
      if (item === selectedShape) {
        isZoneMap.setState({
          selectedZoneId: isZoneMap.props.zone_data[i].id,
          selectedZoneName: isZoneMap.props.zone_data[i].Zonename
        });
      }
    });
    //selectColor(shape.get('fillColor') || shape.get('strokeColor'));
  };
  checkStoredZone = () => {
    var isStoredZone = false;
    console.log("length-->", ZoneBasedPolygons.length);
    ZoneBasedPolygons.map(function(item, i) {
      console.log("i", i);
      if (item === selectedShape && !isStoredZone) {
        isStoredZone = true;
        console.log(
          "i",
          isZoneMap.props.zone_data[i].id +
            ",--" +
            isZoneMap.props.zone_data[i].Zonename
        );
        isZoneMap.setState({
          selectedZoneId: isZoneMap.props.zone_data[i].id,
          selectedZoneName: isZoneMap.props.zone_data[i].Zonename
        });
      }
    });
    if (isStoredZone) {
      isZoneMap.toggleZoneDeletePopup();
    } else {
      isZoneMap.deleteSelectedShape();
    }
  };
  deleteSelectedShape = () => {
    if (selectedShape) {
      selectedShape.setMap(null);
      this.setState({
        selectedBoundaries: false
      });
    }
  };
  clearSelection = () => {
    if (selectedShape) {
      selectedShape.setEditable(false);
      selectedShape = null;
      this.setState({
        selectedBoundaries: false
      });
      if (isZoneMap.infoWindow) isZoneMap.infoWindow.close();
    }
  };
  onDrawCircleBasedHub = e => {
    if (this.state.isHubViewed || !vMap) return;
    setTimeout(function(){ radius = isZoneMap.props.hub_radius || 2;
      var bounds = new window.google.maps.LatLngBounds();
      infowindow = new window.google.maps.InfoWindow();
      isZoneMap.props.makeithub.map(function(item, i) {
         if (item.lat && item.lon) {
        console.log("lat,lon-->",item.lat+"--"+item.lon);
      var latlng = { lat: item.lat, lng: item.lon };
      var circle = new window.google.maps.Circle({
        center:latlng,
        clickable:false,
        scale: 5,
        fillColor: item.color,
        fillOpacity: 0.05,
        radius:radius * 1000,
        strokeColor: item.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
      console.log("circle-->",circle);
      circle.setMap(vMap);
      circle.setOptions({visible:true});
      markersArrayforHUb.push(circle);
    }
  }); }, 3000);
    
   
    //route.setMap(vMap);
    // this.props.makeithub.map(function(item, i) {
    //   if (item.lat && item.lon) {
    //     var contentString =
    //       "<div class='iw-ID'> Hub Id #" +
    //       item.makeithub_id +
    //       "<div><div class='iw-name'>" +
    //       item.address +
    //       "<div><div class='iw-phoneno'>" +
    //       item.xfactor +
    //       "<div>";
    //     var latlng = { lat: item.lat, lng: item.lon };
    //     var marker = new window.google.maps.Marker({
    //       position: latlng,
    //       map: vMap,
    //       title: "" + item.makeithub_id
    //     });
    //     marker.setIcon({
    //       path: window.google.maps.SymbolPath.CIRCLE,
    //       scale: 5,
    //       fillColor: item.color,
    //       fillOpacity: 0.8,
    //       strokeWeight: 1
    //     });
    //     bounds.extend(marker.getPosition());

    //     var sunCircle = {
    //       strokeColor: item.color,
    //       strokeOpacity: 0.8,
    //       strokeWeight: 2,
    //       fillColor: item.color,
    //       fillOpacity: 0.05,
    //       map: vMap,
    //       center: latlng,
    //       radius: radius * 1000 // in meters -->1000 meters to 1 kilometre
    //     };
    //     console.log("sunCircle-->",sunCircle);
    //     var cityCircle = new window.google.maps.Circle(sunCircle);
    //     cityCircle.bindTo("center", marker, "position");
    //     markersArrayforHUb.push(cityCircle);
    //     window.google.maps.event.addListener(
    //       marker,
    //       "click",
    //       (function(marker, i) {
    //         return function() {
    //           infowindow.setContent(contentString);
    //           infowindow.open(vMap, marker);
    //         };
    //       })(marker, i)
    //     );
    //   }
    // });
    //if(vMap){ vMap.fitBounds(bounds);
    this.setState({ isHubViewed: true });
    //}
  };
  getInfoWindowContent(item) {
    var contentString =
      "<div class='iw-ID'> #" +
      item.userid +
      "<div><div class='iw-name'>" +
      item.name +
      "<div><div class='iw-phoneno'>" +
      item.phoneno +
      "<div>";
    return contentString;
  }
  DeleteMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
    markersArray = [];
  }
  DeleteMakeitMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < markersArrayforMakeit.length; i++) {
      markersArrayforMakeit[i].setMap(null);
    }
    markersArrayforMakeit = [];
  }
  addMarker(map, location, address) {
    map.setCenter(location);
  }
  handleSwitchChange = () => {
    console.log("Make_it_checked--->", this.state.Make_it_checked);
    if (!this.state.Make_it_checked) {
      this.setState({ Make_it_checked: true,Make_it_viewed:false});
      this.onLoadMakeitLocationApi();
    } else {
      this.setState({ Make_it_checked: false });
      this.props.clearMakeitMap();
      this.DeleteMakeitMarkers();
    }
  };
  onZonePolygonDelete = () => {
    all_overlays=[];
    for (var i = 0; i < ZoneBasedPolygons.length; i++) {
      ZoneBasedPolygons[i].setMap(null);
    }
    ZoneBasedPolygons = [];
    //this.setState({ isPolygonViewed: false });
  };
  onConfirmtoDelete = () => {
    this.props.onDeleteZoneBoundaries({
      id: this.state.selectedZoneId,
      isDelete: true
    });
  };
  onConfirmtoUpdate = () => {
    this.props.onUpdateZoneBoundaries({
      id: this.state.selectedZoneId,
      boundaries: this.state.selectedBoundaries
    });
  };

  onUpdateCancel = () => {
    this.clearSelection();
    this.setState({ isShape_Change: false, zoneUpdateModal: false });
  };
  onDrawPolygon = (path, Zonename) => {
    var route = new window.google.maps.Polygon({
      path: path,
      strokeWeight: 1,
      fillOpacity: 0.45,
      zIndex: 1,
      content: Zonename
    });
    all_overlays.push(route);
    route.setMap(vMap);
    if (isZoneMap.infoWindow) isZoneMap.infoWindow.close();
    if (!isZoneMap.infoWindow)
      isZoneMap.infoWindow = new window.google.maps.InfoWindow();
    window.google.maps.event.addListener(vMap, "click", function(event) {
      var myLatLng = event.latLng;
      var lat = myLatLng.lat();
      var lng = myLatLng.lng();
      isZoneMap.setState({ clicklat: lat, clicklon: lng });
    });
    path = route.getPath();
    path.addListener("set_at", onAreaChange);
    path.addListener("insert_at", onAreaChange);
    path.addListener("remove_at", onAreaChange);
    route.addListener("click", function(event) {
      var myLatLng = event.latLng;
      var lat = myLatLng.lat();
      var lng = myLatLng.lng();
      isZoneMap.setState({ clicklat: lat, clicklon: lng });
      // toggle editable state
      if (isZoneMap.state.isShape_Change) {
        isZoneMap.toggleZoneUpdatePopup();
        return;
      }
      isZoneMap.setSelection(route);
      isZoneMap.infoWindow.setContent(this.content);
      isZoneMap.infoWindow.setPosition(event.latLng);
      isZoneMap.infoWindow.open(vMap);
    });

    function onAreaChange(n) {
      isZoneMap.setState({ isShape_Change: true });
    }
    ZoneBasedPolygons.push(route);
  };
  onDrawZoneArea = () => {
    if (this.state.isPolygonViewed || !vMap) return;
    this.props.zone_data.map(function(item, i) {
      var path = JSON.parse(item.boundaries);
      isZoneMap.onDrawPolygon(path, item.Zonename);
    });
    if (this.props.zone_data.length>0) this.setState({ isPolygonViewed: true });
  };

 calcIntersection=(newOverlay, allOverlays)=> {
    //ensure the polygon contains enought vertices 
    if(newOverlay.getPath().getLength() < 3){
       alert("Not enought vertices. Draw a polygon that contains at least  3 vertices.");
       newOverlay.setMap(null);
       return false;
    }
  
    var geometryFactory = new jsts.geom.GeometryFactory();
    var newPolygon =isZoneMap.createJstsPolygon(geometryFactory, newOverlay);
  
    //iterate existing polygons and find if a new polygon intersects any of them
    var result = allOverlays.filter(function (currentOverlay) {
      var curPolygon =isZoneMap.createJstsPolygon(geometryFactory, currentOverlay);
      var intersection = newPolygon.intersection(curPolygon);
      return intersection.isEmpty() === false;
    });
  
    //if new polygon intersects any of exiting ones, draw it with green color
    if(result.length > 0){
      return false;
    }else return true;
  }

  createJstsPolygon=(geometryFactory, overlay)=>{
    var path = overlay.getPath();
    var coordinates = path.getArray().map(function name(coord) {
      return new jsts.geom.Coordinate(coord.lat(), coord.lng());
    });
    coordinates.push(coordinates[0]);
    var shell = geometryFactory.createLinearRing(coordinates);
    return geometryFactory.createPolygon(shell);
  }

  render() {
    var moveit_location = this.props.moveit_data || [];
    var makeit_location = this.props.makeit_data || [];
    var Hub_location = this.props.makeithub || [];
    var zone_data = this.props.zone_data || [];
    var un_zone_data = this.props.un_zone_data || [];
    const handleSubmit = this.props.handleSubmit;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;

    if (moveit_location.length > 0) {
      this.addLocationMoveit();
    }
    if (makeit_location.length > 0) {
      this.addLocationMakeit(this.pointInPolygon);
    }
    if (zone_data.length > 0) {
      this.onDrawZoneArea();
    }

    if (Hub_location.length > 0) {
      this.onDrawCircleBasedHub();
    }

    return (
      <div className="pd-8 moveitmap">
        <Card>
          <CardHeader>
            <Row>
              <Col lg="2">
                Zone Map {this.state.clicklat},{this.state.clicklon}
              </Col>
              <Col lg="1.2">
                <Button
                  onClick={this.checkStoredZone}
                  hidden={!this.state.selectedBoundaries}
                >
                  Delete Zone
                </Button>
              </Col>{" "}
              <Col lg="1">
                <Button
                  onClick={this.toggleZoneUpdatePopup}
                  hidden={!this.state.isShape_Change}
                >
                  Update Zone
                </Button>
              </Col>
              <Col>
                <Row className="float-right">
                  <Col lg="3" className="txt-align-center" hidden={true}>
                    <div className="font-size-12">Radius</div>
                    <div className="font-size-12">{this.props.hub_radius}</div>
                  </Col>
                  <Col lg="3" className="txt-align-center">
                    <span className="font-size-12">Kitchen Enable </span>
                    <SwitchButtonCommon
                      handleSwitchChange={this.handleSwitchChange}
                      checked={this.state.Make_it_checked}
                    />
                  </Col>
                  <Col lg="5">
                    <SearchInput onSearch={this.onSearch} />
                  </Col>
                  <Col lg="2">
                    <Button className="mr-r-10" onClick={this.refreshALL}>
                      Refresh
                    </Button>
                  </Col>
                  <Col lg="2">
                    <Button className="mr-r-10" onClick={history.goBack}>
                      Back
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardHeader>
        </Card>
        <div className="mapresize">
          <Map
            id="myMap"
            options={{
              center: { lat: 0, lng: 0 },
              zoom: 16
            }}
            onMapLoad={map => {
              vMap = map;
              //debugger;
              this.refreshALL();
              this.onCustomDrawShape();
            }}
          />
          <Modal
            isOpen={this.state.zoneModal}
            toggle={this.toggleZonePopup}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader toggle={this.toggleZonePopup}>Select Zone</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(this.zoneConfirm)}
                className="product_form"
              >
                <Field
                  name="zoneid"
                  component={renderSelect}
                  label="Zone"
                  validate={[required]}
                >
                  {un_zone_data.map(item => (
                    <option value={item.id} key={item.id}>
                      {item.Zonename}
                    </option>
                  ))}
                </Field>

                <div className="float-right">
                  <Button type="submit" disabled={pristine || submitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={this.state.zoneDeletedModal}
            toggle={this.toggleZoneDeletePopup}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader toggle={this.toggleZoneDeletePopup}>
              Delete Selected Zone
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete the{" "}
              <strong>{this.state.selectedZoneName}</strong>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onConfirmtoDelete}>
                Yes
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleZoneDeletePopup}>
                NO
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.zoneUpdateModal}
            toggle={this.toggleZoneUpdatePopup}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader toggle={this.toggleZoneUpdatePopup}>
              Update Selected Zone
            </ModalHeader>
            <ModalBody>
              Are you sure you want to update the{" "}
              <strong>{this.state.selectedZoneName}</strong>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onConfirmtoUpdate}>
                Yes
              </Button>{" "}
              <Button color="secondary" onClick={this.onUpdateCancel}>
                NO
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

ZoneMapLocation = reduxForm({
  form: ZONE_UPDATE // a unique identifier for this form
})(ZoneMapLocation);

export default connect(mapStateToProps, mapDispatchToProps)(ZoneMapLocation);
