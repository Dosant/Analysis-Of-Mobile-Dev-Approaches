//
//  DetailViewController.swift
//  listTestIOS
//
//  Created by Anton Dosov on 21.05.16.
//  Copyright © 2016 Anton Dosov. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {
  var item:DataItem!
  
  @IBOutlet weak var itemImageView: UIImageView!
  @IBOutlet weak var itemTitle: UILabel!
  @IBOutlet weak var itemExcerpt: UILabel!
  @IBOutlet weak var itemDate: UILabel!
  
  override func viewWillAppear(animated: Bool) {
    self.navigationItem.title = "Item #\(item.id)";
    self.itemTitle.text = item.title;
    self.itemExcerpt.text = item.excerpt;
    self.itemDate.text = item.date;
    self.itemImageView.image = UIImage(named: item.image);
  }
}
