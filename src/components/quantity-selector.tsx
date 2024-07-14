import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onManualChange: (value: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onManualChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button onClick={onDecrease} disabled={quantity <= 1}>-</Button>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => onManualChange(parseInt(e.target.value) || 1)}
        className="w-16 text-center"
        min="1"
      />
      <Button onClick={onIncrease}>+</Button>
    </div>
  );
};

export default QuantitySelector;