function List () {
    return (
        <div>
        <hr />
        <div className="container bootstrap snippets bootdey">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-box no-header clearfix">
                <div className="main-box-body clearfix">
                  <div className="table-responsive">
                    <table className="table user-list">
                      <thead>
                        <tr>
                          <th><span>User</span></th>
                          <th><span>Created</span></th>
                          <th className="text-center"><span>Status</span></th>
                          <th><span>Email</span></th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="#" className="user-link">Full name 1</a>
                            <span className="user-subhead">Member</span>
                          </td>
                          <td>2013/08/12</td>
                          <td className="text-center">
                            <span className="label label-default">pending</span>
                          </td>
                          <td>
                            <a href="#">marlon@brando.com</a>
                          </td>
                          <td style={{width: '20%'}}>
                            <a href="#" className="table-link text-warning">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                            <a href="#" className="table-link text-info">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                            <a href="#" className="table-link danger">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" className="user-link">Full name 2</a>
                            <span className="user-subhead">Admin</span>
                          </td>
                          <td>2013/08/12</td>
                          <td className="text-center">
                            <span className="label label-success">Active</span>
                          </td>
                          <td>
                            <a href="#">marlon@brando.com</a>
                          </td>
                          <td style={{width: '20%'}}>
                            <a href="#" className="table-link  text-warning">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                            <a href="#" className="table-link  text-info">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                            <a href="#" className="table-link danger">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" className="user-link">Full name 3</a>
                            <span className="user-subhead">Member</span>
                          </td>
                          <td>2013/08/12</td>
                          <td className="text-center">
                            <span className="label label-danger">inactive</span>
                          </td>
                          <td>
                            <a href="#">marlon@brando.com</a>
                          </td>
                          <td style={{width: '20%'}}>
                            <a href="#" className="table-link  text-warning">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                            <a href="#" className="table-link  text-info">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                            <a href="#" className="table-link danger">
                              <span className="fa-stack">
                                <i className="fa fa-square fa-stack-2x" />
                                <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                              </span>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}

export default List ;
