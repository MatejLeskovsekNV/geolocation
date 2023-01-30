import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable()
export class PwaService {
  promptEvent: any;
  constructor(private swUpdate: SwUpdate) {
    swUpdate.versionUpdates.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });

    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  askUserToUpdate() {
    return true;
  }
}


