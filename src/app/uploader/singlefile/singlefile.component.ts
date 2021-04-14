import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Uppy from '@uppy/core';
import * as Dashboard from '@uppy/dashboard';
import * as GoldenRetriever from '@uppy/golden-retriever';
import * as Tus from '@uppy/tus';


@Component({
  selector: 'app-singlefile',
  templateUrl: './singlefile.component.html',
  styleUrls: ['./singlefile.component.scss']
})
export class SinglefileComponent implements OnInit {

  @Input() EndPoint: string;
  @Input() FileType: string[]; // [ video/* , image/*, ]
  @Input() numberOfFiles: number;
  @Input() maxFileSize: number;

  @Output() completed = new EventEmitter<any>();

  constructor() {}

  private uppy;

  ngOnInit(): void {

    this.uppy = Uppy<Uppy.StrictTypes>(
      {
        id: 'uppy',
        autoProceed: false,
        allowMultipleUploads: false,
        debug: true,
        restrictions: {
          maxFileSize: null,
          minFileSize: null,
          maxTotalFileSize: null,
          maxNumberOfFiles: this.numberOfFiles,
          minNumberOfFiles: null,
          allowedFileTypes: this.FileType
        },
        meta: {
          user: 'admin'
        },
        onBeforeFileAdded: (currentFile, files) => {
          const modifiedFile = {
            ...currentFile,
            name: currentFile.name + '__' + Date.now()
          };
          return modifiedFile;
        },
        infoTimeout: 5000,
      }
    );


    this.uppy.use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: '.dashboard',
        width: '100%',
        height: '100%',
        thumbnailWidth: 200,
        showProgressDetails: true,
        hideUploadButton: false,
        hideRetryButton: false,
        hidePauseResumeButton: false,
        hideCancelButton: false,
        hideProgressAfterFinish: false,
        doneButtonHandler: () => {
          // this.uppy.reset()
          // this.requestCloseModal()
        },
        closeModalOnClickOutside: false,
        closeAfterFinish: false,
        disableStatusBar: false,
        disableInformer: false,
        disableThumbnailGenerator: false,
        disablePageScrollWhenModalOpen: true,
        animateOpenClose: true,
        proudlyDisplayPoweredByUppy: false,
        onRequestCloseModal: () => {},
        showSelectedFiles: true,
        showRemoveButtonAfterComplete: false,
        browserBackButtonClose: false,
        theme: 'light',
        autoOpenFileEditor: false
    })
    // .use(GoldenRetriever, {
    //   serviceWorker : true,
    //   indexedDB     : {
    //       maxFileSize  : 2 * 1024 * 1024 * 1024, // 2GB => Each file
    //       maxTotalSize : 1024 * 1024 * 1024 * 1024 // 1 TB
    //   }
    // })
    .use(Tus, {
      endpoint: this.EndPoint,          // demo test link => 'https://tusd.tusdemo.net/files/'
      retryDelays: [0, 1000, 3000, 5000],
    });


    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/sw.js') // path to your bundled service worker with GoldenRetriever service worker
    //     .then((registration) => {
    //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }

    this.uppy.on('complete', (result) => {
      this.completed.emit(result);
    });

  }
}
