'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ProductOption =
  | 'Raw Phool Makhana'
  | 'Private Label: Raw'
  | 'Private Label: Roasted or Flavored'
  | 'AÉRI Brand (Distributor)'
  | 'Other';

interface ContactModalContextType {
  isOpen: boolean;
  defaultProduct: ProductOption;
  openModal: (product?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState<ProductOption>('Raw Phool Makhana');

  const openModal = (product?: string) => {
    if (product) {
      if (
        product === 'Raw Phool Makhana' ||
        product === 'Private Label: Raw' ||
        product === 'Private Label: Roasted or Flavored' ||
        product === 'AÉRI Brand (Distributor)' ||
        product === 'Other'
      ) {
        setDefaultProduct(product as ProductOption);
      } else if (product.includes('Suta') || product.includes('Raw')) {
        setDefaultProduct('Raw Phool Makhana');
      } else if (product.includes('Distributor') || product.includes('Brand')) {
        setDefaultProduct('AÉRI Brand (Distributor)');
      } else if (product.includes('Private Label')) {
        setDefaultProduct('Private Label: Raw');
      } else {
        setDefaultProduct('Other');
      }
    } else {
      setDefaultProduct('Raw Phool Makhana');
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, defaultProduct, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}
