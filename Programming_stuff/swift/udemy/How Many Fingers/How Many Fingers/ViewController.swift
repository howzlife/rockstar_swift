//
//  ViewController.swift
//  How Many Fingers
//
//  Created by Nicolas Dubus on 2015-09-21.
//  Copyright © 2015 WorldDubination. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var userGuess: UITextField!
    @IBOutlet weak var resultText: UILabel!

    @IBAction func submitGuess(sender: AnyObject) {
        var isAPrime = true
        var guessInt = Int(userGuess.text!)
        
        print(userGuess.text!)
        
        if guessInt != nil {
            var i:Double = 2
            while i <= sqrt(Double(guessInt!)) {
                if Double(guessInt!) % i == 0 {
                    isAPrime = false
                    break
                }
                i++
            }
            resultText.text = (isAPrime ? "Is A Prime" : "Not a prime")
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

