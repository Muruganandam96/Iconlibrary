import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Antfilled } from 'src/assets/ant design/ant-filled';
import * as svgtojsx from 'svg-to-jsx';

@Component({
  selector: 'app-icon-grid',
  templateUrl: './icon-grid.component.html',
  styleUrls: ['./icon-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconGridComponent implements OnInit, AfterViewInit {

  @ViewChild('icon') iconContainer: ElementRef;

  @Input()
  get name(): string { return this._name; }
  set name(iconName: string) {

    this._name = iconName;
  }
  declare public require: any;

  private _name = '';
  show = false;


  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const value = Antfilled[this._name] || null;
    if (value) {
      this.iconContainer.nativeElement.innerHTML = Antfilled[this._name] || null;
      this.iconContainer.nativeElement.children[0].setAttribute('width', '24px');
      this.iconContainer.nativeElement.children[0].setAttribute('height', '24px');
      const label = document.createElement('p');
      label.innerHTML = this._name;
      label.className = 'icon-label';
      this.iconContainer.nativeElement.append(label);
    }
    else {
      this.show = !this.show;
      console.log(this.show);
    }


  }

  displayCopiedText(ele): void {
    const copyDiv = document.createElement('div');
    copyDiv.innerHTML = 'Copied!';
    copyDiv.className = 'copyText';
    ele.append(copyDiv);
    setTimeout(() => {
      ele.removeChild(copyDiv);
    }, 1200);

  }

  copyText(event): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = Antfilled[this._name] || null;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.displayCopiedText(event.target);
    this.transform(selBox.value);
  }

  transform(node): void {
    svgtojsx(node).then(function (jsx) {
       console.log(jsx);
    });
  }
}

// if (paragraph.hasAttributes()) {
//   var attrs = paragraph.attributes;
//   var output = "";
//   for(var i = attrs.length - 1; i >= 0; i--) {	
//     var para = document.createElement('p');
//     para.innerHTML = attrs[i].name;
//     var par = document.getElementById('para');
//     par.append(para);
//     output += attrs[i].name + "->" + attrs[i].value;
//   }
//   result.value = output;
// } else {
//   result.value = "No attributes to show";
// }


// https://github.com/balajmarius/svg2jsx/blob/8494f73dc2f0c823bebdfef7e8e5bfa28a884e20/packages/transform/lib/transformer.js#L33


