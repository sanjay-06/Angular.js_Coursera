import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

    submitFeedback(fb: Feedback): Observable<Feedback> {
        const httpOptions = {
            headers: new HttpHeaders({
                'ContentType': 'application/json'
            })
        };
        return this.http.post<Feedback>(baseURL + 'feedback', fb, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));

    }
}
