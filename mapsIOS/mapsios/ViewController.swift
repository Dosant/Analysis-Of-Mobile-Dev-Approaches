//
//  ViewController.swift
//  mapsios
//
//  Created by Anton Dosov on 21.05.16.
//  Copyright © 2016 Anton Dosov. All rights reserved.
//

import UIKit
import GoogleMaps

class ViewController: UIViewController, CLLocationManagerDelegate, GMSMapViewDelegate {
  @IBOutlet weak var mapView: GMSMapView!
  let locationManager = CLLocationManager()
  let workCords = CLLocationCoordinate2DMake(53.927690, 27.683296)
  var didFindMyLocation = false;
  let mapTasks = MapTasks()

  override func viewDidLoad() {
    super.viewDidLoad()
    
    locationManager.delegate = self
    locationManager.requestAlwaysAuthorization()
    self.mapView.delegate = self
    self.mapView.myLocationEnabled = false;
    self.mapView.addObserver(self, forKeyPath: "myLocation", options: NSKeyValueObservingOptions.New, context: nil)

    
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  func locationManager(manager: CLLocationManager!, didChangeAuthorizationStatus status: CLAuthorizationStatus) {
    if status == CLAuthorizationStatus.AuthorizedAlways {
      self.mapView.myLocationEnabled = true
    }
  }
  
  @IBAction func goToWorkAction(sender: AnyObject) {
    mapView.camera = GMSCameraPosition.cameraWithTarget(workCords, zoom: 12)
    
    mapTasks.getDirections(self.mapView.myLocation!.coordinate, destination: self.workCords, completionHandler: { (status, pathData) in
      
      let path = GMSPath(fromEncodedPath: pathData)
      let routePoline = GMSPolyline(path: path)
      routePoline.map = self.mapView
      
      let marker = GMSMarker()
      marker.position = self.workCords
      marker.title = "Work"
      marker.snippet = "Work Work Work"
      marker.appearAnimation = GMSMarkerAnimation.Pop
      marker.icon = GMSMarker.markerImageWithColor(UIColor.blueColor())
      marker.map = self.mapView
      
    })
    
    
  }
  
  override func observeValueForKeyPath(keyPath: String?, ofObject object: AnyObject?, change: [String : AnyObject]?, context: UnsafeMutablePointer<Void>) {
    if !didFindMyLocation {
      let myLocation: CLLocation = change![NSKeyValueChangeNewKey] as! CLLocation
      mapView.camera = GMSCameraPosition.cameraWithTarget(myLocation.coordinate, zoom: 15.0)
      mapView.settings.myLocationButton = true
      didFindMyLocation = true
      
      let marker = GMSMarker()
      marker.position = CLLocationCoordinate2DMake(myLocation.coordinate.latitude, myLocation.coordinate.longitude);
      marker.title = "You!"
      marker.snippet = "You're here!"
      marker.map = mapView
      
      mapTasks.getDirections(self.mapView.myLocation!.coordinate, destination: self.workCords, completionHandler: { (status, pathData) in  })

    }
  }


}

