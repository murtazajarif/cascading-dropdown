import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

interface Fund {
  Ticker: string;
  FundName: string;
  FundSector: string;
  FundFamily: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title =  'FundSearcher';
  funds: Fund[] = [ {
    "Ticker": "ADFAX",
    "FundName": "AC-DIV BND-A",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "AMERICAN CENTURY"
  },
  {
    "Ticker": "ADFIX",
    "FundName": "AC-DIV BND-INV",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "AMERICAN CENTURY"
  },
  {
    "Ticker": "ADVRX",
    "FundName": "AC-DIV BND-R",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "AMERICAN CENTURY"
  },
  {
    "Ticker": "CDBCX",
    "FundName": "AC-DIV BND-C",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "AMERICAN CENTURY"
  },
  {
    "Ticker": "BFAAX",
    "FundName": "BC-DIV BND-A",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "BLACKROCK"
  },
  {
    "Ticker": "BFIBX",
    "FundName": "BC-DIV BND-I",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "BLACKROCK"
  },
  {
    "Ticker": "BFRAX",
    "FundName": "BC-DIV BND-R",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "BLACKROCK"
  },
  {
    "Ticker": "CBBCX",
    "FundName": "BC-DIV BND-C",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "BLACKROCK"
  },
  {
    "Ticker": "CGAAX",
    "FundName": "CC-DIV BND-A",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "COLUMBIA"
  },
  {
    "Ticker": "CGIBX",
    "FundName": "CC-DIV BND-I",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "COLUMBIA"
  },
  {
    "Ticker": "CGRAX",
    "FundName": "CC-DIV BND-R",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "COLUMBIA"
  },
  {
    "Ticker": "CCBCX",
    "FundName": "CC-DIV BND-C",
    "FundSector": "BOND DIVERSIFIED",
    "FundFamily": "COLUMBIA"
  }];
  formGroup!: FormGroup;

  fundFamilies: string[] = [];
  filteredFundFamilies: string[] = [];

  fundSectors: string[] = [];
  filteredFundSectors: string[] = [];

  fundNames: string[] = [];
  filteredFundNames: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.initializeFunds();
  }

  initForm() {
    this.formGroup = this.fb.group({
      'fundFamily': [''],
      'fundSector': [''],
      'fundName': [''],
      'fundTicker': new FormControl({value: '', disabled: true})  // Ticker is read-only and auto-filled
    });

    // Debounce search for fund family
    this.formGroup.get('fundFamily')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterFundFamilies(value);
        this.initializeFundSectors();  // Initialize sectors when family changes
        

      });

    // Debounce search for fund sector
    this.formGroup.get('fundSector')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterFundSectors(value);
        this.initializeFundNames();  // Initialize names when sector changes
      });

    // Debounce search for fund name
    this.formGroup.get('fundName')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.filterFundNames(value));
  }

  initializeFundSectors() {
    // Get the sectors for the selected family and initialize the filtered list
    const selectedFamily = this.formGroup.get('fundFamily')?.value;
    this.fundSectors = [...new Set(this.funds.filter(fund =>
      fund.FundFamily === selectedFamily
    ).map(fund => fund.FundSector))];
    this.filteredFundSectors = this.fundSectors;  // Show all sectors initially
  }

  initializeFundNames() {
    // Get the names for the selected sector and initialize the filtered list
    const selectedSector = this.formGroup.get('fundSector')?.value;
    this.fundNames = [...new Set(this.funds.filter(fund =>
      fund.FundFamily === this.formGroup.get('fundFamily')?.value &&
      fund.FundSector === selectedSector
    ).map(fund => fund.FundName))];
    this.filteredFundNames = this.fundNames;  // Show all names initially
  }


  initializeFunds() {
    // Extract unique fund families
    this.fundFamilies = [...new Set(this.funds.map(fund => fund.FundFamily))];
    this.filteredFundFamilies = this.fundFamilies;
  }

  filterFundFamilies(value: string) {
    this.filteredFundFamilies = this.fundFamilies.filter(fundFamily =>
      fundFamily.toLowerCase().includes(value.toLowerCase())
    );
  }

  filterFundSectors(value: string) {
    this.fundSectors = [...new Set(this.funds.filter(fund =>
      fund.FundFamily === this.formGroup.value.fundFamily
    ).map(fund => fund.FundSector))];
    this.filteredFundSectors = this.fundSectors.filter(fundSector =>
      fundSector.toLowerCase().includes(value.toLowerCase())
    );
  }

  filterFundNames(value: string) {
    this.fundNames = [...new Set(this.funds.filter(fund =>
      fund.FundFamily === this.formGroup.value.fundFamily &&
      fund.FundSector === this.formGroup.value.fundSector
    ).map(fund => fund.FundName))];
    this.filteredFundNames = this.fundNames.filter(fundName =>
      fundName.toLowerCase().includes(value.toLowerCase())
    );
  }
  onFundNameSelected() {
    const fundName = this.formGroup.get('fundName')?.value;
    if (fundName) {
      const tickers = this.getTickersForFundName(fundName);
      if (tickers.length === 1) {
        this.formGroup.get('fundTicker')?.setValue(tickers[0]);
      }
    }
  }

  getTickersForFundName(fundName: string): string[] {
    return this.funds
      .filter(fund => fund.FundName === fundName)
      .map(fund => fund.Ticker);
  }
}
