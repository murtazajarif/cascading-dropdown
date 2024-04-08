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
  funds: Fund[] = [
    {
      "Ticker": "AC001",
      "FundName": "AC-DIV BND-A1",
      "FundSector": "BOND DIVERSIFIED",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AC002",
      "FundName": "AC-DIV BND-A2",
      "FundSector": "EQUITY GROWTH",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AC003",
      "FundName": "AC-DIV BND-A3",
      "FundSector": "INTERNATIONAL",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AC004",
      "FundName": "AC-DIV BND-A4",
      "FundSector": "TECHNOLOGY",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AC005",
      "FundName": "AC-DIV BND-A5",
      "FundSector": "REAL ESTATE",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "BC001",
      "FundName": "BC-DIV BND-A1",
      "FundSector": "BOND DIVERSIFIED",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BC002",
      "FundName": "BC-DIV BND-A2",
      "FundSector": "EQUITY GROWTH",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BC003",
      "FundName": "BC-DIV BND-A3",
      "FundSector": "INTERNATIONAL",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BC004",
      "FundName": "BC-DIV BND-A4",
      "FundSector": "TECHNOLOGY",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BC005",
      "FundName": "BC-DIV BND-A5",
      "FundSector": "REAL ESTATE",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "CC001",
      "FundName": "CC-DIV BND-A1",
      "FundSector": "BOND DIVERSIFIED",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CC002",
      "FundName": "CC-DIV BND-A2",
      "FundSector": "EQUITY GROWTH",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CC003",
      "FundName": "CC-DIV BND-A3",
      "FundSector": "INTERNATIONAL",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CC004",
      "FundName": "CC-DIV BND-A4",
      "FundSector": "TECHNOLOGY",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CC005",
      "FundName": "CC-DIV BND-A5",
      "FundSector": "REAL ESTATE",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "AD001",
      "FundName": "AD-DIV BND-A1",
      "FundSector": "BOND DIVERSIFIED",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AD002",
      "FundName": "AD-DIV BND-A2",
      "FundSector": "EQUITY GROWTH",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AD003",
      "FundName": "AD-DIV BND-A3",
      "FundSector": "INTERNATIONAL",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AD004",
      "FundName": "AD-DIV BND-A4",
      "FundSector": "TECHNOLOGY",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "AD005",
      "FundName": "AD-DIV BND-A5",
      "FundSector": "REAL ESTATE",
      "FundFamily": "AMERICAN CENTURY"
    },
    {
      "Ticker": "BD001",
      "FundName": "BD-DIV BND-A1",
      "FundSector": "BOND DIVERSIFIED",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BD002",
      "FundName": "BD-DIV BND-A2",
      "FundSector": "EQUITY GROWTH",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BD003",
      "FundName": "BD-DIV BND-A3",
      "FundSector": "INTERNATIONAL",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BD004",
      "FundName": "BD-DIV BND-A4",
      "FundSector": "TECHNOLOGY",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "BD005",
      "FundName": "BD-DIV BND-A5",
      "FundSector": "REAL ESTATE",
      "FundFamily": "BLACKROCK"
    },
    {
      "Ticker": "CD001",
      "FundName": "CD-DIV BND-A1",
      "FundSector": "BOND DIVERSIFIED",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CD002",
      "FundName": "CD-DIV BND-A2",
      "FundSector": "EQUITY GROWTH",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CD003",
      "FundName": "CD-DIV BND-A3",
      "FundSector": "INTERNATIONAL",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CD004",
      "FundName": "CD-DIV BND-A4",
      "FundSector": "TECHNOLOGY",
      "FundFamily": "COLUMBIA"
    },
    {
      "Ticker": "CD005",
      "FundName": "CD-DIV BND-A5",
      "FundSector": "REAL ESTATE",
      "FundFamily": "COLUMBIA"
    }
  ];
  formGroup!: FormGroup;

  fundFamilies: string[] = [];
  filteredFundFamilies: string[] = [];

  fundSectors: string[] = [];
  filteredFundSectors: string[] = [];

  fundNames: string[] = [];
  filteredFundNames: string[] = [];

  tickers: string[] = [];
  filteredTickers: string[] = [];

  fundNameSelected: boolean = false;
  tickerSelected: boolean = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    // this.initializeFunds();
    this.initializeDropdowns();
  }

  initForm() {
    this.formGroup = this.fb.group({
      'fundFamily': [''],
      'fundSector': [''],
      'fundName': [''],
      'ticker': [''],
    });

    // Debounce search for fund family
    this.formGroup.get('fundFamily')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterOptions('fundFamily', value);
      });

      this.formGroup.get('fundSector')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterOptions('fundSector', value);
      });

      this.formGroup.get('fundName')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterOptions('fundName', value);
      });

      this.formGroup.get('ticker')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterOptions('ticker', value);
      });
  }
  
  initializeDropdowns() {
    this.fundFamilies = [...new Set(this.funds.map(fund => fund.FundFamily))];
    this.fundSectors = [...new Set(this.funds.map(fund => fund.FundSector))];
    this.fundNames = [...new Set(this.funds.map(fund => fund.FundName))];
    this.tickers = [...new Set(this.funds.map(fund => fund.Ticker))];

    this.filteredFundFamilies = this.fundFamilies;
    this.filteredFundSectors = this.fundSectors;
    this.filteredFundNames = this.fundNames;
    this.filteredTickers = this.tickers;
  }

  
  filterOptions(dropdown: string, value: string) {
  // Reset selections if the value is cleared
  const lowerValue = value.toLowerCase();
  if (!value) {
    this.initializeDropdowns();
    this.resetDropdowns();
    return;
  }

  let filteredFunds = this.funds;

  // Clear fundName and ticker if fundFamily or fundSector is changed
  if (dropdown === 'fundFamily') {
    this.formGroup.patchValue({
      fundName: '', // Reset fundName
      ticker: '', // Reset ticker
    }, {emitEvent: false}); // Prevent triggering valueChanges again
  }

  if (dropdown === 'fundSector') {
    this.formGroup.patchValue({
      fundName: '', // Reset fundName
      ticker: '', // Reset ticker
    }, {emitEvent: false}); // Prevent triggering valueChanges again
  }

  // Check and apply fundFamily filter if it's not the one being changed or if it has a value
    if (dropdown !== 'fundFamily' && this.formGroup.get('fundFamily')?.value) {
        filteredFunds = filteredFunds.filter(fund => fund.FundFamily.includes(this.formGroup.get('fundFamily')?.value));
    }
    
    // Check and apply fundSector filter if it's not the one being changed or if it has a value
    if (dropdown !== 'fundSector' && this.formGroup.get('fundSector')?.value) {
        filteredFunds = filteredFunds.filter(fund => fund.FundSector.includes(this.formGroup.get('fundSector')?.value));
    }

  
  switch (dropdown) {
    case 'fundFamily':
      filteredFunds = filteredFunds.filter(fund => fund.FundFamily.toLowerCase().includes(lowerValue));
      break;
    case 'fundSector':
      filteredFunds = filteredFunds.filter(fund => fund.FundSector.toLowerCase().includes(lowerValue));
      break;
    case 'fundName':
      filteredFunds = this.funds.filter(fund => fund.FundName.toLowerCase().includes(lowerValue));
      break;
    case 'ticker':
      filteredFunds = this.funds.filter(fund => fund.Ticker.toLowerCase().includes(lowerValue));
      break;
  }

  this.updateFilteredLists(filteredFunds);

  // Handle autofill and ensure no automatic selection when clearing input
  if (filteredFunds.length === 1) {
    this.handleAutofill(filteredFunds[0]);
  }
}

updateFilteredLists(filteredFunds: Fund[]): void {
  this.filteredFundFamilies = [...new Set(filteredFunds.map(fund => fund.FundFamily))];
  this.filteredFundSectors = [...new Set(filteredFunds.map(fund => fund.FundSector))];
  this.filteredFundNames = [...new Set(filteredFunds.map(fund => fund.FundName))];
  this.filteredTickers = [...new Set(filteredFunds.map(fund => fund.Ticker))];
}

handleAutofill(selectedFund: Fund): void {
  // Only autofill if a specific fund is uniquely identified by the selection
  this.formGroup.patchValue({
    fundFamily: selectedFund.FundFamily,
    fundSector: selectedFund.FundSector,
    fundName: selectedFund.FundName,
    ticker: selectedFund.Ticker
  }, {emitEvent: false});
}

resetDropdowns(): void {
  this.filteredFundFamilies = this.extractUniqueValues(this.funds, 'FundFamily');
  this.filteredFundSectors = this.extractUniqueValues(this.funds, 'FundSector');
  this.filteredFundNames = this.extractUniqueValues(this.funds, 'FundName');
  this.filteredTickers = this.extractUniqueValues(this.funds, 'Ticker');
  // Clear selected values without emitting events that could trigger filters again
  this.formGroup.patchValue({
    fundName: '',
    ticker: ''
  }, {emitEvent: false});
}
extractUniqueValues(funds: Fund[], key: keyof Fund): string[] {
  return [...new Set(funds.map(fund => fund[key]))];
}
}
