import { Label } from '@components/ui/label'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { cn } from '@/libs/utils'
import type { StudentField } from './types'

interface StudentFormFieldProps {
  label: string;
  field: StudentField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: 'text' | 'select';
  options?: { value: string; label: string; }[];
  inputProps?: Record<string, unknown>;
}

export const StudentFormField = ({
  label,
  value,
  error,
  onChange,
  type = 'text',
  options = [],
  inputProps = {}
}: StudentFormFieldProps) => {
  return (
    <div className="col-span-2">
      <Label className={error ? 'text-red-500' : ''}>
        {label}
      </Label>

      {type === 'select' ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={cn(error ? 'border-red-500' : '')}>
            <SelectValue placeholder={`เลือก${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          className={error ? 'border-red-500' : ''}
          {...inputProps}
        />
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
