import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import {DocumentService} from '../services/document.service';
import {RDocument} from '../services/data';

import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    selector: 'reviews',
    templateUrl: 'reviews.component.html',
    styleUrls: ['reviews.component.css'],
})


export class ReviewsComponent implements OnInit {

    videoDocument: RDocument;
    docList: RDocument[];
    selectedDoc: RDocument;
    selectedTab: string;


    constructor(
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private location: Location
    ) {
    }

    ngOnInit(): void {

        this.getDocList();

    }


    getDocList(): void {
        this.documentService.getDocuments().then(videoDocument => this.docList = videoDocument);
    }


    addDocument(name: string, url: string, type: number): void {

        if (!name || !url ||  type >= -1 || type <= 1 ) { return; }

        let doc = {
            id: Date.now(),
            name: name,
            url: url,
            relevance: 0,
            checked_times: 0,
            type: type,
        };

        this.documentService.create(doc)
            .then(doc => {
                this.docList.push(doc);
            });
    }
}
