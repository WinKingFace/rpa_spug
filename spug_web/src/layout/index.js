/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the AGPL-3.0 License.
 */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { NotFound } from 'components';
import Sider from './Sider';
import Header from './Header';
import Footer from './Footer'
import routes from '../routes';
import { hasPermission } from 'libs';
import styles from './layout.module.less';

function initRoutes(Routes, routes) {
  for (let route of routes) {
    if (route.component) {
      if (!route.auth || hasPermission(route.auth)) {
        Routes.push(<Route exact key={route.path} path={route.path} component={route.component}/>)
      }
    } else if (route.child) {
      initRoutes(Routes, route.child)
    }
  }
}

export default function () {
  const [collapsed, setCollapsed] = useState(false)
  const [Routes, setRoutes] = useState([]);

  useEffect(() => {
    const Routes = [];
    initRoutes(Routes, routes);
    setRoutes(Routes)
  }, [])

  return (
    <Layout>
      <Sider collapsed={collapsed}/>
      <Layout style={{height: '100vh'}}>
        <Header collapsed={collapsed} toggle={() => setCollapsed(!collapsed)}/>
        <Layout.Content className={styles.content}>
          <Switch>
            {Routes}
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
