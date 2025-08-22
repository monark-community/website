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

export type CurrencyType = 'FIAT' | 'CRYPTO';

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  type: CurrencyType;
}

export interface CurrencyAmountInputProps {
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

export function CurrencyAmountInput({
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
}: CurrencyAmountInputProps) {
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
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          {selectedCurrencyObj?.type === 'FIAT' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
              {getCurrencySymbol(selectedCurrencyObj)}
            </div>
          )}
          <Input
            type="number"
            placeholder={placeholder}
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            disabled={disabled}
            className={selectedCurrencyObj?.type === 'FIAT' ? 'pl-8' : ''}
            step="any"
            min="0"
          />
        </div>
        
        <Select 
          value={selectedCurrency} 
          onValueChange={onCurrencyChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-[160px]">
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
      
      {showConversion && conversionText && amount && (
        <p className="text-sm text-muted-foreground">{conversionText}</p>
      )}
    </div>
  );
}