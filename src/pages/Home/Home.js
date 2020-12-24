import React from 'react'
import { Link } from "@reach/router"
import './Home.css';
import kwizzie from '../../imgs/kwizzie.svg'

// HOME
export const Home = () => (
  <div className="Home game-wrapper">
    <img className="kwizzie" src={kwizzie} />
    <h1 className="logo space-bottom-l">Libre<div>Kwiz</div></h1>
    <Link className="button space-bottom-m" to='/create'>Create new</Link>
    <Link className="button button-green space-bottom-m" to='/admin'>Admin Game</Link>
    <Link className="button button-ghost space-bottom-m" to='/game/user'>Play Game</Link>
  </div>
)
