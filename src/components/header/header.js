import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OutboundButton from '../../components/buttons/outboundButton'
import Emoji from '../../components/emoji/emoji'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

class Header extends Component {

  doScrollIntoView = (e) => {
    const view = e.currentTarget.dataset.view;
    document.querySelector(`${view}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  render() {
    return (
      <StaticQuery query={graphql`
      query HeaderQuery {
        contentfulHeader{
          greetings
          name
          role
          button{
            content
            emoji
          }
        }
        headerImg: file(relativePath: {eq: "header-background.jpg"}) {
          childImageSharp {
            fluid(quality: 90){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `} render={data => (
          <header>
            <section id="home" className="hero is-fullheight">
              <div className="hero-body">
                <div className="container">
                  <h2 className="subtitle">{data.contentfulHeader.greetings}</h2>
                  <h1 className="title is-1">{data.contentfulHeader.name}</h1>
                  <h2 className="subtitle is-2">{data.contentfulHeader.role}</h2>
                  <a className="button is-primary is-rounded is-medium" data-view="#contact" onClick={this.doScrollIntoView}><span>{data.contentfulHeader.button.content} <Emoji emoji={data.contentfulHeader.button.emoji} /></span></a>
                </div>
              </div>
              <Img fluid={data.headerImg.childImageSharp.fluid} className="header-bg" alt="header image" style={{ position: "absolute" }} />
              <FontAwesomeIcon className="scroll-down-icon" icon="angle-double-down" size="2x" data-view="#skills" onClick={this.doScrollIntoView} />
            </section>
          </header>
        )} />
    );
  }
}

export default Header;