// src/services/serviceService.js
import { PUBLIC_URL, PRIVATE_URL } from "./api";

// Fetch all services
export const getServices = () => PUBLIC_URL.get("services/services/");

// Fetch service categories
export const getServiceCategories = () => PUBLIC_URL.get("services/categories/");

// Fetch vendors
export const getVendors = () => PUBLIC_URL.get("vendors/");

// Fetch vendor details
export const getVendorDetails = (vendorId) => PUBLIC_URL.get(`vendors/${vendorId}/`);

// Fetch services by category
export const getServicesByCategory = (categoryId) => 
  PUBLIC_URL.get(`services/services/?category=${categoryId}`);

// Fetch services by vendor
export const getServicesByVendor = (vendorId) => 
  PUBLIC_URL.get(`services/services/?vendor=${vendorId}`);
