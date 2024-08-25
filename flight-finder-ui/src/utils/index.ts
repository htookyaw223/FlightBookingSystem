// Common type for label-value pairs
interface LabeledValue<T> {
    value: T;
    label: string;
  }
  
  // Types for TripMode and CabinClass
  type TripModeType = 'oneWay' | 'roundTrip';
  type CabinClassType = 'business' | 'economy';
  
  // TripMode interface using the generic LabeledValue
  export type TripMode = LabeledValue<TripModeType>;
  
  // CabinClass interface using the generic LabeledValue
  export type CabinClass = LabeledValue<CabinClassType>;
  
  // TripMode constants
  export const oneWayTrip: TripMode = {
    value: 'oneWay',
    label: "One way"
  };
  
  export const roundTrip: TripMode = {
    value: 'roundTrip',
    label: 'Round Trip'
  };
  
  // CabinClass constants
  export const economyClass: CabinClass = {
    value: 'economy',
    label: "Economy"
  };
  
  export const businessClass: CabinClass = {
    value: 'business',
    label: 'Business'
  };
  