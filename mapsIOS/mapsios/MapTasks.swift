//
//  File.swift
//  mapsios
//
//  Created by Anton Dosov on 21.05.16.
//  Copyright © 2016 Anton Dosov. All rights reserved.
//

import UIKit
class MapTasks: NSObject {
  
  
  let baseURLDirections = "https://maps.googleapis.com/maps/api/directions/json?"
  
  var selectedRoute: Dictionary<NSObject, AnyObject>!
  
  var overviewPolyline: Dictionary<NSObject, AnyObject>!
  
  var originCoordinate: CLLocationCoordinate2D!
  
  var destinationCoordinate: CLLocationCoordinate2D!
  
  var originAddress: String!
  
  var destinationAddress: String!

  var cachedPathData: String!
  
  override init() {
    super.init()
  }
  
  
  
  func getDirections(origin: CLLocationCoordinate2D!, destination: CLLocationCoordinate2D!, completionHandler: ((status: String, pathData: String) -> Void)) {
    
    if let _pathData = cachedPathData {
      completionHandler(status: "CACHED", pathData: _pathData)
    }
    var directionsURLString = baseURLDirections + "origin=\(origin.latitude),\(origin.longitude)" + "&destination=\(destination.latitude),\(destination.longitude)"
    directionsURLString = directionsURLString.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding)!
    let directionsURL = NSURL(string: directionsURLString)
    
    dispatch_async(dispatch_get_main_queue(), { () -> Void in
      let directionsData = NSData(contentsOfURL: directionsURL!)
      
      do {
        let dictionary = try NSJSONSerialization.JSONObjectWithData(directionsData!, options: .MutableContainers)
        if let _dictionary = dictionary as? [NSObject: AnyObject] {
          let status = _dictionary["status"] as? String
          if status == "OK" {
            let route = (dictionary["routes"] as! [[NSObject: AnyObject]])[0]
            let polyline = route["overview_polyline"] as! [NSObject: AnyObject];
            let pathData = polyline["points"] as! String
            self.cachedPathData = pathData;
            completionHandler(status: status!, pathData: pathData)
          }
        }
      } catch let error as NSError{
        print(error.localizedDescription);
      }
    })
  }
}
  
  
