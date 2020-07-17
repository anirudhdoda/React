import React,{ Component } from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';
import Comments from './CommentsDetails';
import { DISHES } from '../shared/dishes';

class DishDetail extends Component
{
    renderComment(dishId)
        {
            if(dishId!=null)
            {
                const dish = DISHES.filter(d => d.id === dishId)[0];

                const commentsLayout=dish.comments.map((comment)=> {  
                 return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p> --{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                    );
                });

                return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    {commentsLayout}
                </ul>
                </div>
                    
                );
            }
            else{
                return(
                    <div></div>
                )
            };

        }



    renderDish(dishId) {
        if (dishId != null)
        {
            const dish = DISHES.filter(d => d.id === dishId)[0];

            return(
                <Card>
                    <CardImg top width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
          }
        else{
            return(
                <div></div>
            );
          }
        }
        render()
        {
            return(
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                  {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md">
                    {this.renderComment(this.props.selectedDish)}
                </div>
             </div>
               </div> 

            );
        }
}
export default DishDetail;