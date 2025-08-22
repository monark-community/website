"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type CurrencyType = 'FIAT' | 'CRYPTO';

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  type: CurrencyType;
}

// Default FIAT currencies
export const defaultFiatCurrencies: Currency[] = [
  { id: "USD", name: "US Dollar", symbol: "USD", type: "FIAT" },
  { id: "EUR", name: "Euro", symbol: "EUR", type: "FIAT" },
  { id: "CAD", name: "Canadian Dollar", symbol: "CAD", type: "FIAT" },
  { id: "GBP", name: "British Pound", symbol: "GBP", type: "FIAT" },
];

// Generate crypto currencies from network tokens
export const generateCryptoCurrencies = (networks: { id: string; symbol: string; name: string }[]): Currency[] => {
  return networks.map(network => ({
    id: network.symbol,
    name: network.name,
    symbol: network.symbol,
    type: "CRYPTO" as CurrencyType,
  }));
};

export interface AmountCurrencyInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: Currency[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showConversion?: boolean;
  conversionText?: string;
  // Filtering options
  filterByType?: CurrencyType[];
  filterByIds?: string[];
  excludeIds?: string[];
  customFilter?: (currency: Currency) => boolean;
}

export function AmountCurrencyInput({
  amount,
  onAmountChange,
  selectedCurrency,
  onCurrencyChange,
  currencies,
  placeholder = "0.00",
  className,
  disabled = false,
  showConversion = false,
  conversionText,
  filterByType,
  filterByIds,
  excludeIds,
  customFilter,
}: AmountCurrencyInputProps) {
  // Apply filters to currencies
  const filteredCurrencies = currencies.filter(currency => {
    // Filter by type if specified
    if (filterByType && !filterByType.includes(currency.type)) {
      return false;
    }
    
    // Filter by specific IDs if specified
    if (filterByIds && !filterByIds.includes(currency.id)) {
      return false;
    }
    
    // Exclude specific IDs if specified
    if (excludeIds && excludeIds.includes(currency.id)) {
      return false;
    }
    
    // Apply custom filter if provided
    if (customFilter && !customFilter(currency)) {
      return false;
    }
    
    return true;
  });

  const selectedCurrencyObj = filteredCurrencies.find(c => c.id === selectedCurrency);
  const fiatCurrencies = filteredCurrencies.filter(c => c.type === 'FIAT');
  const cryptoCurrencies = filteredCurrencies.filter(c => c.type === 'CRYPTO');

  const getCurrencySymbol = (currency: Currency) => {
    if (currency.type === 'FIAT') {
      switch (currency.id) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'GBP': return '£';
        case 'CAD': return 'C$';
        default: return currency.symbol;
      }
    }
    return currency.symbol;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Combined Input and Select */}
      <div className="flex relative border border-input bg-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {/* Amount Input */}
        <Input
          type="number"
          placeholder={placeholder}
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={disabled}
          step="any"
          min="0"
          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
        />
        
        {/* Currency Select */}
        <div className="border-l border-input">
          <Select 
            value={selectedCurrency} 
            onValueChange={onCurrencyChange}
            disabled={disabled}
          >
            <SelectTrigger className="border-none bg-transparent focus:ring-0 focus:ring-offset-0 rounded-none rounded-r-md min-w-[120px]">
              <SelectValue>
                {selectedCurrencyObj && (
                  <div className="flex items-center gap-1">
                    <span className="font-medium">
                      {selectedCurrencyObj.type === 'FIAT' 
                        ? getCurrencySymbol(selectedCurrencyObj)
                        : selectedCurrencyObj.symbol
                      }
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {selectedCurrencyObj.type === 'FIAT' 
                        ? selectedCurrencyObj.symbol
                        : `(${selectedCurrencyObj.name})`
                      }
                    </span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {/* Crypto currencies first */}
              {cryptoCurrencies.length > 0 && (
                <>
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                    CRYPTO
                  </div>
                  {cryptoCurrencies.map((currency) => (
                    <SelectItem key={currency.id} value={currency.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currency.symbol}</span>
                        <span className="text-muted-foreground text-xs">
                          ({currency.name})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
              
              {/* FIAT currencies */}
              {fiatCurrencies.length > 0 && (
                <>
                  {cryptoCurrencies.length > 0 && (
                    <div className="border-t my-1" />
                  )}
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                    FIAT
                  </div>
                  {fiatCurrencies.map((currency) => (
                    <SelectItem key={currency.id} value={currency.id}>
                      <div className="flex items-center gap-2">
                        <span>{getCurrencySymbol(currency)}</span>
                        <span>{currency.symbol}</span>
                        <span className="text-muted-foreground text-xs">
                          {currency.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Conversion text */}
      {showConversion && conversionText && amount && (
        <p className="text-sm text-muted-foreground">{conversionText}</p>
      )}
    </div>
  );
}