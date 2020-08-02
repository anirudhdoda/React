import React,{ Component } from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,ButtonModal,ModalHeader,ModalBody,Button,Label,Modal,Row,Col } from 'reactstrap';
import Comments from './CommentsDetails';
import { DISHES } from '../shared/dishes';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
  import {baseUrl} from '../shared/baseUrl';
  import { FadeTransform,Stagger,Fade} from 'react-animation-components';


 const required=(val)=>val && val.length;
 const maxLength=(len)=>(val)=>!(val) || (val.length<=len);
 const minLength=(len)=>(val)=>!(val) || (val.length>=len);




class CommentForm extends Component{
    constructor(props)
    {
     super(props);
     this.state={
      isModalOpen:false
	 }
     this.toggleModal=this.toggleModal.bind(this);
	};
    toggleModal()
      {
         this.setState({
          isModalOpen: !this.state.isModalOpen
          });
	  }
      handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.yourName,values.comments);
	}
    render(){
     return(
     <>
     <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg" ></span>Submit Comment</Button>
                       
                       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        
                        <Col md={12}>
                            <Control.select model=".rating"
                                name="rating" className="form-control" validators={{required}}>
                               
                                   <option>1</option> 
                                   <option>2</option> 
                                   <option>3</option> 
                                   <option>4</option> 
                                   <option>5</option> 
                                </Control.select>
                                <Errors 
                            className="text-danger"
                            model=".rating"
                            show="touched"
                            messages={{
                            required:'Required',
                            
							}}
                            />
                                
                          </Col>
                          </Row>
                          
                              <Row className="form-group">
                                <Label htmlFor="yourName" md={5}>
                                Your Name
                                 </Label>
                                <Col md={12}>
                                <Control.text model=".yourName" name="yourName" className="form-control"
                                placeholder="Your Name"
                                validators={{
                                required,minLength:minLength(3),maxLength:maxLength(15)            
							}}
                                />
                                <Errors 
                            className="text-danger"
                            model=".yourName"
                            show="touched"
                            messages={{
                            required:'Required',
                            minLength:'Must be greater than 2 characters',
                            maxLength:'Must be 15 characters or less'
							}}
                            />
                                  </Col>
                                </Row>
                                <Row className="form-group">
                                <Label htmlFor="comments" md={3}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comments" name="comments" rows="10" className="form-control"/>
                                </Col>
                                </Row>
                                <Row className="form-group">
                                <Col md={3}>
                                <Button color="primary"className="form-control">Submit</Button>
                                </Col>
                                </Row>
               
                              
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </>
	 );
	}
}



 



   function RenderComment({comments,postComment,dishId})
        {
            if(comments!=null)
            {

                const commentsLayout=comments.map((comment)=> {  
                 return(
                 <Fade in>
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p> --{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    </Fade>
                    );
                });

                return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    <Stagger in>
                    {commentsLayout}
                    </Stagger>
                     <CommentForm dishId={dishId} postComment={postComment}/>
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



    function RenderDish({dish}) {
        if (dish != null)
        {
            

            return(
            <FadeTransform in 
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'    
			}}>
                <Card>
                    <CardImg top width="100%" src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
             </FadeTransform>
            );
          }
        else{
            return(
                <div></div>
            );
          }
        }
        const DishDetail=(props)=>{
        if(props.isLoading){
      return(
       <div className="container">
        <div className="row">
            <Loading/>
        </div>
       </div>
	  );
		}
        else if(props.errMess){
            return(
       <div className="container">
        <div className="row">
            <h4>{props.errmess}</h4>
        </div>
       </div>
	  );
		}
            return(
            <div className="container">
            <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
             <BreadcrumbItem><Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          </div>
          <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr/>
          </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md">
                    <RenderComment comments={props.comments} postComment={props.postComment}
                    dishId={props.dish.id}/>

                    
                </div>
             </div>
               </div> 

            );
        }
        
export default DishDetail;