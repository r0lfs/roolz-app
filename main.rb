require 'sinatra'
require 'slim'
require 'roolz'


get '/' do 

  slim :home
end

get '/examples' do 
  all = Rool::All.new(Rool::True.new, Rool::True.new)
  @all_json = all.to_json
  all.process
  @all = all 

  any = Rool::Any.new(Rool::True.new, Rool::False.new)
  @any_json = any.to_json
  any.process 
  @any_processed = any.to_json
  @any = any

  not_rool = Rool::Not.new(Rool::Any.new(Rool::False.new, Rool::True.new))
  @not_json = not_rool.to_json
  not_rool.process 
  @not_rool = not_rool
  
  @data1 = {a_key: [1,2,3,4,5,6,7,8,9]}
  iterate = Rool::Iterate.new(:a_key, 5, Rool::LessThan, Rool::Any)
  @iterate_json = iterate.to_json
  iterate.process(@data1)
  @iterate = iterate

  slim :examples
end