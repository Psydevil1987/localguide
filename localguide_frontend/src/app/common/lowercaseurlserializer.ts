//Router funktionalitäten
import { DefaultUrlSerializer, UrlTree,UrlSegmentGroup } from '@angular/router';

//Url ansteuerung klein machen, damit caseinsensitiv wird
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    override parse(url: string): UrlTree {
        const urlTree = super.parse(url);

        this.lowerCaseSegments(urlTree.root);
        
        //url zurückgeben
        return urlTree; 
    }

    private lowerCaseSegments(urlSegmentGroup: UrlSegmentGroup) {

        if (urlSegmentGroup.hasChildren()) {
            //url lein machen
            Object.entries(urlSegmentGroup.children).forEach(
                ([key, value]) => this.lowerCaseSegments(value)
            );

        }

        urlSegmentGroup.segments.forEach((segment) => segment.path = segment.path.toLowerCase());
    }
}