import { Component, forwardRef, Input } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'lx-avatar',
  imports: [Avatar, SlicePipe],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvatarUpload),
      multi: true,
    },
  ],
})
export class AvatarUpload implements ControlValueAccessor {
  @Input() letter: string = '';
  avatar?: string;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.avatar = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 128;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const ratio = Math.min(size / img.width, size / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (size - w) / 2;
        const y = (size - h) / 2;
        ctx.drawImage(img, x, y, w, h);
        const base64 = canvas.toDataURL('image/png');
        this.avatar = base64;
        this.onChange(base64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    this.onTouched();
  }
}
