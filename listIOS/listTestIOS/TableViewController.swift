//
//  TableViewController.swift
//  listTestIOS
//
//  Created by Anton Dosov on 21.05.16.
//  Copyright © 2016 Anton Dosov. All rights reserved.
//

import UIKit


class TableViewController: UITableViewController {
  let dateFormatter = NSDateFormatter()
  var listData:[DataItem]!;
  
  override func viewDidLoad() {
    super.viewDidLoad()
    dateFormatter.locale = NSLocale.currentLocale()
    dateFormatter.dateFormat = "dd.MM.yyyy"
    
    tableView.estimatedRowHeight = 150.0
    tableView.rowHeight = UITableViewAutomaticDimension
    
    let url = NSBundle.mainBundle().URLForResource("data", withExtension: "json")
    let data = NSData(contentsOfURL: url!);
    do {
      let object = try NSJSONSerialization.JSONObjectWithData(data!, options: .AllowFragments)
      if let dataArray = object as? [AnyObject] {
         listData = dataArray.map(getDataItem);
      }
    } catch let error as NSError{
      print(error.localizedDescription);
    }
  }
  
  func getDataItem(object: AnyObject) -> DataItem{
    guard let id = object["id"] as? Int,
      let title = object["title"] as? String,
      let excerpt = object["excerpt"] as? String,
      let image = object["img"] as? String,
      let ds = object["createdAt"] as? Double else { return DataItem(id: -1, title: "", excerpt: "", image: "", date:  "") } 
    let date = dateFormatter.stringFromDate(NSDate(timeIntervalSince1970: ds));

    return DataItem(id: id, title: title, excerpt: excerpt, image: image, date: date);
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  // MARK: - Table view data source
  
  override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
    return 1;
  }
  
  override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return self.listData.count;
  }
  
  
  
   override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCellWithIdentifier("cell", forIndexPath: indexPath) as? TableViewCell
    let itemData = self.listData[indexPath.row]
    cell!.title.text = itemData.title
    cell!.excerpt.text = itemData.excerpt
    cell!.date.text = itemData.date
    cell!.itemImageView.image = UIImage(named: itemData.image);
    return cell!
   }

   override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
     if editingStyle == .Delete {
     // Delete the row from the data source
      self.listData.removeAtIndex(indexPath.row);
      tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
     }
   }
  
   // MARK: - Navigation
  
   override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
    let detailViewController = segue.destinationViewController as! DetailViewController;
    let currentIndex = tableView.indexPathForSelectedRow;
    let detailData = listData[currentIndex!.row];
    detailViewController.item = detailData
   }
 
  
}
