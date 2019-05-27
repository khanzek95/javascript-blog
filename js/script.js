'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */

  this.classList.add('active');

  /* remove class 'active' from all articles */
  
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = this.getAttribute('href');
     console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

   const targetArticle = document.querySelector(articleSelector);
   console.log(targetArticle);
  
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){
  

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles) {
    article.classList.remove('active');
  
    /* get the article id */

    const articleId = article.getAttribute('id');
     console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
}

  titleList.innerHTML = html;
} 

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
 
  for(let article of articles) {
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    articleTagsArray.forEach(function(value) {
      console.log(value);
      });
    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      html = html + linkHTML;
    }
    
    titleList.innerHTML = html;
  }
}

generateTags();


function tagClickHandler(event){
  event.preventDefault(); /* prevent default action for this event */
  const clickedElement = this; /* make new constant named "clickedElement" and give it the value of "this" */
  const href = this.getAttribute('href'); /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tag = href.replace('#tag-', ''); /* make a new constant "tag" and extract tag from the "href" constant */
  const tagLinkActive = document.querySelectorAll('a.active[href^="#tag-"]'); /* find all tag links with class active */
  for(let tagLinkActive of tagLinkActives){  /* START LOOP: for each active tag link */
    tagLinkActive.classList.remove('active');    /* remove class active */
  } /* END LOOP: for each active tag link */
  const eachTagWithHref = document.querySelectorAll('a[href="' + href + '"]'); /* find all tag links with "href" attribute equal to the "href" constant */
  for(let eachTagWithHref of eachTagWithHrefs){              /* START LOOP: for each found tag link */
    eachTagWithHref.classList.add('active');   /* add class active */
  }  /* END LOOP: for each found tag link */


   generateTitleLinks('[data-tags~="' + tag + '"]'); /* execute function "generateTitleLinks" with article selector as argument */

}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();