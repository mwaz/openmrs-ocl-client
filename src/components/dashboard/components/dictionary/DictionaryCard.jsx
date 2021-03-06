import React from 'react';
import { Link } from 'react-router-dom';
import persistActiveconcept from './helperFunction';

const DictionaryCard = (dictionary) => {
  const {
    dictionary: {
      name,
      owner,
      short_code,
      owner_type,
      owner_url,
      active_concepts,
      created_by,
      url,
    },
    fetchData
  } = dictionary;

  const ownerType = owner_type === 'Organization' ? 'org' : 'user';
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
      <div className="card-container" id="dictionary">
        <div className="source-card-body">
          <div className="source-name col-12 mt-3" id="dictionaryHeader">
            <a>
              <h6 className="text-left" id="cardCapitalize">
                { name }
              </h6>
            </a>
            <div className="float-created-at" id="dictionary-owner">
              <a className="source-owner-name">
                { owner } <small>({ownerType})</small>
              </a>
            </div>
          </div>
          <div className="description col-12 text-left">
            <p>
              <Link to={`/concepts${owner_url}${short_code}`} 
              className="source-type" 
                onClick={() => persistActiveconcept(active_concepts)}>
                Concepts: { active_concepts }
              </Link>
              <br/>
              <a className="source-type" id="cardCapitalize">
                Created By: { created_by }
              </a>
            </p>
          </div>
        </div>
        <div className="source-card-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            id="viewDetails"
            onClick={() => fetchData({ url })}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DictionaryCard;
