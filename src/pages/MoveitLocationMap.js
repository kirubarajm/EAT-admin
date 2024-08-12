import React from "react";
import Map from "../components/Map";
import {
  MOVEIT_CURRENT_LOCATION,
  MOVEIT_CURRENT_LOCATION_CLEAR,
  LIVE_GET_MAKEIT,
  MAKEIT_GET_HUB,
  MAKEIT_LOCATION_CLEAR,
  GET_ALL_ZONE
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { connect } from "react-redux";
import { Row, Col, Card, Button, CardHeader } from "reactstrap";
import SearchInput from "../components/SearchInput";
import { notify } from "react-notify-toast";
import SwitchButtonCommon from "../components/SwitchButtonCommon";
import { history } from "../store";

const mapStateToProps = state => ({
  ...state.moveitmaplocation,
  makeithub: state.common.makeithub,
  hub_radius: state.common.hub_radius,
  zone_data: state.common.zone_data
});

const mapDispatchToProps = dispatch => ({
  getAllFeedback: () =>
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
      type: GET_ALL_ZONE,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),
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
let myColor = { background: "#314911", text: "#ffffff" };
var infowindow;
var radius = 1;
var makeitCircle;
var isZoneMap;
var ZoneBasedPolygons = [];
class MoveitLocationMap extends React.Component {
  constructor() {
    super();
    this.state = {
      Make_it_checked: false,
      isHubViewed: false,
      isPolygonViewed: false,
      Move_it_viewed:false,
    };
    isZoneMap = this;
  }
  componentWillMount() {
    this.addMarker = this.addMarker.bind();
    this.addLocationMoveit = this.addLocationMoveit.bind();
    this.addLocationMakeit = this.addLocationMakeit.bind();
    this.onDrawCircleBasedHub = this.onDrawCircleBasedHub.bind();
    this.refreshFeedback = this.refreshFeedback.bind();
    this.onSearch = this.onSearch.bind();
    this.onLoadLocationApi = this.onLoadLocationApi.bind();
    this.onLoadMakeitLocationApi = this.onLoadMakeitLocationApi.bind();
    this.handleSwitchChange = this.handleSwitchChange.bind();
    this.onGetZoneData = this.onGetZoneData.bind();
    if (!this.props.hub_radius) radius = this.props.hub_radius || 1;
  }

  onGetZoneData = () => {
    this.props.onGetZone();
  };
  onLoadLocationApi = () => {
    if (!this.props.makeithub || this.props.makeithub.length === 0)
      this.props.onGetMovieitHub();
  };

  onLoadMakeitLocationApi = () => {
    var filter = {
      virtualkey: "all",
      appointment_status: 3,
      search: "",
      //active_status: "0"
    };
    this.props.onGetRestaurants(filter);
  };

  componentDidUpdate(nextProps, nextState) {}
  refreshFeedback = () => {
    if (vMap) this.DeleteMarkers();
    this.setState({ Move_it_viewed: false });
    this.props.clearMap();
    this.props.getAllFeedback();
  };

  onSearch = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      var moveit_array=this.props.moveit_data||[];
      if (moveit_array.length > 0 && markersArray.length > 0) {
        var isSearch = false;
        for (var i = 0; i < markersArray.length; i++) {
          if (markersArray[i].title == e.target.value && !isSearch) {
            isSearch = true;
            if (vMap) {
              vMap.setCenter(markersArray[i].getPosition());
              if (infowindow) infowindow.close();
              infowindow.setContent(
                this.getInfoWindowContent(moveit_array[i])
              );
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

  addLocationMakeit = e => {
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
        //vMap.setCenter(latlng);
      });
      if(markersArrayforMakeit.length>0)
      vMap.fitBounds(bounds);
    }
  };

  onDrawCircleBasedHub = e => {
    if (this.state.isHubViewed || !vMap) return;
    setTimeout(function(){ radius = isZoneMap.props.hub_radius || 2;
      var bounds = new window.google.maps.LatLngBounds();
      infowindow = new window.google.maps.InfoWindow();
      isZoneMap.props.makeithub.map(function(item, i) {
        if (item.lat && item.lon) {
          var contentString =
            "<div class='iw-ID'> Hub Id #" +
            item.makeithub_id +
            "<div><div class='iw-name'>" +
            item.address +
            "<div><div class='iw-phoneno'>" +
            item.xfactor +
            "<div>";
          var latlng = { lat: item.lat, lng: item.lon };
          var marker = new window.google.maps.Marker({
            position: latlng,
            map: vMap,
            title: "" + item.makeithub_id
          });
          marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: item.color,
            fillOpacity: 0.8,
            strokeWeight: 1
          });
          bounds.extend(marker.getPosition());
  
          var sunCircle = {
            strokeColor: item.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: item.color,
            fillOpacity: 0.05,
            map: vMap,
            center: latlng,
            radius: radius * 1000 // in meters -->1000 meters to 1 kilometre
          };
          markersArrayforHUb.push(marker);
          var cityCircle = new window.google.maps.Circle(sunCircle);
          cityCircle.bindTo("center", marker, "position");
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
      });if(vMap){
        vMap.fitBounds(bounds);
      } }, 1000);
    
      this.setState({ isHubViewed: true });
    
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
    var marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: address
    });
    map.setCenter(location);
  }
  handleSwitchChange = () => {
    console.log("Make_it_checked--->", this.state.Make_it_checked);
    if (!this.state.Make_it_checked) {
      this.setState({ Make_it_checked: true });
      this.onLoadMakeitLocationApi();
    } else {
      this.setState({ Make_it_checked: false });
      this.props.clearMakeitMap();
      this.DeleteMakeitMarkers();
    }
  };

  onDrawPolygon = (path, Zonename) => {
    var route = new window.google.maps.Polygon({
      path: path,
      strokeWeight: 1,
      fillOpacity: 0.45,
      zIndex: 1,
      content: Zonename
    });
    route.setMap(vMap);
    if (isZoneMap.infoWindow) isZoneMap.infoWindow.close();
    if (!isZoneMap.infoWindow)
      isZoneMap.infoWindow = new window.google.maps.InfoWindow();
    route.addListener("click", function(event) {
      isZoneMap.infoWindow.setContent(this.content);
      isZoneMap.infoWindow.setPosition(event.latLng);
      isZoneMap.infoWindow.open(vMap);
    });

    ZoneBasedPolygons.push(route);
  };
  onDrawZoneArea = () => {
    if (this.state.isPolygonViewed) return;
    setTimeout(function(){ isZoneMap.props.zone_data.map(function(item, i) {
      var path = JSON.parse(item.boundaries);
      isZoneMap.onDrawPolygon(path, item.Zonename);
    });
     }, 2000);
     isZoneMap.setState({ isPolygonViewed: true });
    
  };
  onZonePolygonDelete = () => {
    for (var i = 0; i < ZoneBasedPolygons.length; i++) {
      ZoneBasedPolygons[i].setMap(null);
    }
    ZoneBasedPolygons = [];
    this.setState({ isPolygonViewed: false });
  };

  render() {
    var moveit_location = this.props.moveit_data || [];
    var makeit_location = this.props.makeit_data || [];
    var Hub_location = this.props.makeithub || [];
    var zone_data = this.props.zone_data || [];
    if (moveit_location.length > 0) {
      this.addLocationMoveit();
    }
    if (makeit_location.length > 0) {
      this.addLocationMakeit();
    }
    if (Hub_location.length > 0) {
      this.onDrawCircleBasedHub();
    }

    if (zone_data.length > 0) {
      this.onDrawZoneArea();
    }

    return (
      <div className="pd-8 moveitmap">
        <Card>
          <CardHeader>
            <Row>
              <Col lg="2">Move it location</Col>
              <Col lg="10">
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
                    <Button className="mr-r-10" onClick={this.refreshFeedback}>
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
              this.refreshFeedback();
              this.onLoadLocationApi();
              this.onGetZoneData();
            }}
          />{" "}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveitLocationMap);
