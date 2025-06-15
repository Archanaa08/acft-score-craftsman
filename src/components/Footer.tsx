
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">ACFT Calculator</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Professional Army Combat Fitness Test calculator designed to help military personnel 
              calculate their ACFT scores accurately and efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/calculator" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} ACFT Calculator. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            &copy; {new Date().getFullYear()} acftscore.one
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            This calculator is not affiliated with the U.S. Army and is for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
